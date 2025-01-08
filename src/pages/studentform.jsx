import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import fireConfig from "../firebaseconf";
import { getDatabase, ref, onValue, push } from "firebase/database";
import Preloader from '../components/preloader';
import Alert from '../components/alert';

export default function StudentForm() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [newStudent, setNewStudent] = useState({
        Name: '', email: '', rollNo: '', Mothername: '', Fathername: '', Branch: '', phoneNo: '', address: '', DOB: ''
    });

    useEffect(() => {
        const database = getDatabase(fireConfig);
        const collectionRef = ref(database, "students");

        // Fetch data once when component mounts
        const unsubscribe = onValue(collectionRef, (snapshot) => {
            const dataItem = snapshot.val();
            if (dataItem) {
                // Map entries to include their unique keys
                const displayItem = Object.keys(dataItem).map(key => ({
                    id: key,
                    ...dataItem[key]
                }));
                setData(displayItem);
                console.log("Fetched data with IDs:", displayItem);
            } else {
                setData([]);
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
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
        setLoading(true);
        const database = getDatabase(fireConfig);
        const collectionRef = ref(database, "students");

        try {
            const newStudentRef = await push(collectionRef, newStudent);
            console.log("Student added with ID:", newStudentRef.key); // Log the unique ID of the new student
            setNewStudent({
                Name: '', email: '', rollNo: '', Mothername: '', Fathername: '', Branch: '', phoneNo: '', address: '', DOB: ''
            });
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds
        } catch (error) {
            console.error("Error adding student:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className='col-8 pt-5'>
                {alertVisible && <Alert message="Form submitted successfully!" />}
                <h1 className='text-center mb-4'>Add Student</h1>
                {loading && <Preloader />}
                <form onSubmit={handleAddStudent}>
                    <div className='row justify-content-center'>
                        <div className="form-floating mb-3 ps-3 col-5">
                            <input value={newStudent.Name} name='Name' onChange={handleChange} type="text" className="form-control" id="studentName" placeholder="Student name" />
                            <label htmlFor="studentName" className='ms-3'>Student name</label>
                        </div>
                        <div className="form-floating ps-3 col-5">
                            <input value={newStudent.email} name='email' onChange={handleChange} type="email" className="form-control" id="studentEmail" placeholder="Email" />
                            <label htmlFor="studentEmail" className='ms-3'>Email</label>
                        </div>
                        <div className="form-floating mb-3 ps-3 col-5">
                            <input value={newStudent.rollNo} name='rollNo' onChange={handleChange} type="number" className="form-control" id="studentRollNo" placeholder="Roll No." />
                            <label htmlFor="studentRollNo" className='ms-3'>Roll No.</label>
                        </div>
                        <div className="form-floating ps-3 col-5">
                            <input value={newStudent.Mothername} name='Mothername' onChange={handleChange} type="text" className="form-control" id="motherName" placeholder="Mother's name" />
                            <label htmlFor="motherName" className='ms-3'>Mother's name</label>
                        </div>
                        <div className="form-floating ps-3 mb-3 col-5">
                            <input value={newStudent.Fathername} name='Fathername' onChange={handleChange} type="text" className="form-control" id="fatherName" placeholder="Father's name" />
                            <label htmlFor="fatherName" className='ms-3'>Father's name</label>
                        </div>
                        <div className="form-floating ps-3 col-5">
                            <input value={newStudent.Branch} name='Branch' onChange={handleChange} type="text" className="form-control" id="branch" placeholder="Branch" />
                            <label htmlFor="branch" className='ms-3'>Branch</label>
                        </div>
                        <div className="form-floating ps-3 mb-3 col-5">
                            <input value={newStudent.phoneNo} name='phoneNo' onChange={handleChange} type="tel" className="form-control" id="phoneNo" placeholder="Phone No." />
                            <label htmlFor="phoneNo" className='ms-3'>Phone No.</label>
                        </div>
                        <div className="form-floating ps-3 mb-3 col-5">
                            <input value={newStudent.DOB} name='DOB' onChange={handleChange} type="date" className="form-control" id="dob" placeholder="Date of Birth" />
                            <label htmlFor="dob" className='ms-3'>Date of Birth</label>
                        </div>
                        <div className="form-floating ps-3 mb-3 col-10">
                            <textarea value={newStudent.address} name='address' onChange={handleChange} placeholder="Address" className="form-control" id="address" style={{ height: "100px" }}></textarea>
                            <label htmlFor="address" className='ms-3'>Address</label>
                        </div>
                    </div>
                    <button type="submit" className='w-25 btn btn-outline-danger offset-1' disabled={loading}>Submit</button>
                </form>
            </section>
        </Layout>
    );
}
