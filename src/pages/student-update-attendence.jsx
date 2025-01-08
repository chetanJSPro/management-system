import React, { useEffect, useState } from 'react';
import "../styles/scss/component.scss";
import Layout from '../components/layout';
import { getDatabase, onValue, ref } from 'firebase/database';
import fireConfig, { database } from '../firebaseconf';
function AddAttendence() {
    const today = Date.now();
    const fulldate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(today);

    const [students, setStudents] = useState([]);

    const [data, setData] = useState(null);
    const [marks, setMarks] = useState({}); // Store marks for each student

    useEffect(() => {
        const dataRef = ref(database, 'students');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            setData(fetchedData);

            // Initialize marks state for each student
            const initialMarks = {};
            if (fetchedData) {
                Object.keys(fetchedData).forEach((key) => {
                    initialMarks[key] = fetchedData[key];
                });
            }

            setMarks(initialMarks);
        });

        return () => unsubscribe();
    }, []);
    console.log(marks);

    function submitForm(e) {
        const update = students.map((student) => {
            student.present = document.querySelector(`input[value="${student.name}"]:checked`) ? "yes" : "no";
            return student;
        });
        setStudents(update);
        console.log(students);
        e.preventDefault();
    }

    return (
        <Layout>
            {students ? (<form onSubmit={submitForm} id='myForm' action="" className='col-8 p-5'>
                <h1>Update Attendence</h1>
                <p>Today: {fulldate}</p>
                <p>Teacher:</p>
                <table className='table table-hover table-responsive'>
                    <thead className="table-light">
                        <tr className='text-uppercase'>
                            <th scope="col">name</th>
                            <th scope="col">rollno</th>
                            <th scope="col">branch</th>
                            <th scope="col">present</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student) => {
                                return <tr>
                                    <td scope="col">
                                        {student.name}
                                    </td>

                                    <td scope="col">
                                        {student.rollno}
                                    </td>
                                    <td scope="col">
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label p-2" for="flexRadioDefault1">
                                                <input type="radio" value={student.name} name={student.id} required style={{ height: 20, width: 20, verticalAlign: "middle" }} />
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label p-2" for="flexRadioDefault2">
                                                <input type="radio" name={student.id} required style={{ height: 20, width: 20, verticalAlign: "middle" }} />
                                                No
                                            </label>
                                        </div>
                                    </td>
                                    <td scope="col">{student.class}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button onClick={submitForm} type="submit" className='btn btn-lg btn-success text-uppercase'>submit</button>
            </form>
            ) : (
                <tr>
                    <td colSpan="7" className="text-center">
                        Loading data...
                    </td>
                </tr>
            )
            }
        </Layout >
    )
}

export default AddAttendence
