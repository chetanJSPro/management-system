// import React, { useEffect, useState } from 'react'
// import Layout from './layout'
// import fireConfig from "../firebaseconf"
// import { getDatabase, ref, onValue, set } from "firebase/database";

// export default function StudentForm() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         const database = getDatabase(fireConfig);
//         const collectionRef = ref(database, "your_collection");

//         // Function to fetch data from the database
//         const fetchData = () => {
//             // Listen for changes in the collection
//             onValue(collectionRef, (snapshot) => {
//                 const dataItem = snapshot.val();

//                 // Check if dataItem exists
//                 if (dataItem) {
//                     // Convert the object values into an array
//                     const displayItem = Object.values(dataItem);
//                     setData(displayItem);
//                 }
//             });
//         };
//         fetchData();
//     }, []);



//     return (
//         <Layout>
//             <section className='col-8 pt-5'>
//                 <h1 className=' text-center mb-4'>Add Student</h1>
//                 <form action="" >
//                     <div className='row justify-content-center'>
//                         <div className="form-floating mb-3 col-5">
//                             <input value={newStudent.Name} name='Name' onChange={handleChange} type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
//                             <label for="floatingInput" className='ms-3'>Student name</label>
//                         </div>
//                         <div className="form-floating col-5">
//                             <input value={newStudent.email} name='email' onChange={handleChange} type="email" className="form-control" id="floatingPassword" placeholder="Email" />
//                             <label for="floatingPassword" className='ms-3'>Email</label>
//                         </div>
//                         <div className="form-floating mb-3 col-5">
//                             <input value={newStudent.rollNo} name='rollNo' onChange={handleChange} type="number" className="form-control" id="floatingPassword" placeholder="Rollno." />
//                             <label for="floatingPassword" className='ms-3'>Rollno.</label>
//                         </div>
//                         <div className="form-floating col-5">
//                             <input value={newStudent.Mothername} name='Mothername' onChange={handleChange} type="text" className="form-control" id="floatingPassword" placeholder="Mother's name" />
//                             <label for="floatingPassword" className='ms-3'>Mother's name</label>
//                         </div>
//                         <div className="form-floating mb-3 col-5">
//                             <input value={newStudent.Fathername} name='Fathername' onChange={handleChange} type="text" className="form-control" id="floatingPassword" placeholder="Father's name" />
//                             <label for="floatingPassword" className='ms-3'>Father's name</label>
//                         </div>
//                         <div className="form-floating col-5">
//                             <input value={newStudent.Branch} name='Branch' onChange={handleChange} type="text" className="form-control" id="floatingPassword" placeholder="Branch" />
//                             <label for="floatingPassword" className='ms-3'>Branch</label>
//                         </div>
//                     </div>
//                     <button onClick={handleAddStudent} className='w-25 btn btn-outline-danger offset-1'>Submit</button>
//                 </form>
//                 <ul>
//                     {data.map((item, index) => (

//                         <li key={index}>{item}</li>
//                     ))}
//                 </ul>
//             </section>
//         </Layout>
//     )
// }

// const handleAddStudent = (e) => {

//     const updatedStudents = [...students, newStudent];
//     setstudents(updatedStudents);
//     localStorage.setItem('students', JSON.stringify(updatedStudents));
//     setNewStudent({
//         Name: '',
//         email: '',
//         rollNo: '',
//         Mothername: '',
//         Fathername: '',
//         Branch: ''
//     });
//     e.preventDefault();
//     console.log(students);
//     // console.log(newStudent);
// };

// const [newStudent, setNewStudent] = useState({
//     Name: '',
//     email: '',
//     rollNo: '',
//     Mothername: '',
//     Fathername: '',
//     Branch: ''
// });
// const [students, setstudents] = useState([]);
// const handleChange = (e) => {
//     setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
// };
// const storedStudents = JSON.parse(localStorage.getItem('students'));
// if (storedStudents) {
//     setstudents(storedStudents);
// }

import React, { useEffect, useState } from 'react';
import Layout from './layout';
import fireConfig from "../firebaseconf";
import { getDatabase, ref, onValue, push } from "firebase/database";
import Preloader from './preloader';
import Alert from './alert';

export default function StudentForm() {
    const [data, setData] = useState([]);
    const [newStudent, setNewStudent] = useState({
        Name: '',
        email: '',
        rollNo: '',
        Mothername: '',
        Fathername: '',
        Branch: ''
    });

    useEffect(() => {
        const database = getDatabase(fireConfig);
        const collectionRef = ref(database, "students");

        // Fetch data only once when the component mounts
        onValue(collectionRef, (snapshot) => {
            const dataItem = snapshot.val();
            if (dataItem) {
                const displayItem = Object.values(dataItem);
                setData(displayItem);
                console.log("Fetched data:", displayItem); // Log only when data is initially fetched
            } else {
                setData([]); // Set an empty array if no data is available
            }
        });
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const database = getDatabase(fireConfig);
        const collectionRef = ref(database, "students");

        push(collectionRef, newStudent)
            .then(() => {
                console.log("Student added successfully!");
                setNewStudent({ Name: '', email: '', rollNo: '', Mothername: '', Fathername: '', Branch: '' });
            })
            .catch((error) => {
                console.error("Error adding student:", error);
            });
        console.log(data);
        setLoading(true);

        // Simulate form submission (replace this with your actual submission logic)
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
        setAlertVisible(true);
        setLoading(false);
    };
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    return (
        <Layout>
            <section className='col-8 pt-5'>
                {alertVisible && <Alert message="Form submitted successfully!" />}
                <h1 className=' text-center mb-4'>Add Student</h1>
                {loading && <Preloader />}
                <form onSubmit={handleAddStudent}>
                    <div className='row justify-content-center'>
                        <div className="form-floating mb-3 col-5">
                            <input value={newStudent.Name} name='Name' onChange={handleChange} type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput" className='ms-3'>Student name</label>
                        </div>
                        <div className="form-floating col-5">
                            <input value={newStudent.email} name='email' onChange={handleChange} type="email" className="form-control" id="floatingPassword" placeholder="Email" />
                            <label htmlFor="floatingPassword" className='ms-3'>Email</label>
                        </div>
                        <div className="form-floating mb-3 col-5">
                            <input value={newStudent.rollNo} name='rollNo' onChange={handleChange} type="number" className="form-control" id="floatingPassword" placeholder="Rollno." />
                            <label htmlFor="floatingPassword" className='ms-3'>Rollno.</label>
                        </div>
                        <div className="form-floating col-5">
                            <input value={newStudent.Mothername} name='Mothername' onChange={handleChange} type="text" className="form-control" id="floatingPassword" placeholder="Mother's name" />
                            <label htmlFor="floatingPassword" className='ms-3'>Mother's name</label>
                        </div>
                        <div className="form-floating mb-3 col-5">
                            <input value={newStudent.Fathername} name='Fathername' onChange={handleChange} type="text" className="form-control" id="floatingPassword" placeholder="Father's name" />
                            <label htmlFor="floatingPassword" className='ms-3'>Father's name</label>
                        </div>
                        <div className="form-floating col-5">
                            <input value={newStudent.Branch} name='Branch' onChange={handleChange} type="text" className="form-control" id="floatingPassword" placeholder="Branch" />
                            <label htmlFor="floatingPassword" className='ms-3'>Branch</label>
                        </div>
                    </div>
                    <button type="submit" className='w-25 btn btn-outline-danger offset-1'>Submit</button>
                </form>


            </section>
        </Layout>
    );
}
