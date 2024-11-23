import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { onValue, ref, update } from 'firebase/database';
import { database } from '../firebaseconf';

export default function UpdateMarks() {
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
                    initialMarks[key] = fetchedData[key].marks || {
                        English: 0,
                        Maths: 0,
                        Physics: 0,
                        IT: 0,
                    };
                });
            }

            setMarks(initialMarks);
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleMarksChange = (studentId, subject, value) => {
        setMarks((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [subject]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update each student's marks in Firebase
            const updatePromises = Object.keys(marks).map((studentId) => {
                const studentRef = ref(database, `students/${studentId}/marks`);
                return update(studentRef, marks[studentId]);
            });

            await Promise.all(updatePromises); // Wait for all updates to complete

            // Fetch updated data after submitting
            const dataRef = ref(database, 'students');
            onValue(dataRef, (snapshot) => {
                const updatedData = snapshot.val();
                console.log('Updated Data:', updatedData);
            });
        } catch (error) {
            console.error('Error updating marks:', error);
        }
    };

    return (
        <Layout>
            <section className='col-8 pt-5'>
                <h1 className='text-center mb-4'>Update Student Marks</h1>
                <form onSubmit={handleSubmit}>
                    <div className='row justify-content-center table-responsive ms-3'>
                        <table className='table table-hover'>
                            <thead className='table-light'>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    <th>English</th>
                                    <th>Maths</th>
                                    <th>Physics</th>
                                    <th>Fundamentals of IT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    Object.keys(data).map((key, index) => (
                                        <tr key={key}>
                                            <td>{index + 1}</td>
                                            <td>{data[key].Name || 'N/A'}</td>
                                            <td>{data[key].rollNo || 'N/A'}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={marks[key]?.English || ''}
                                                    onChange={(e) =>
                                                        handleMarksChange(key, 'English', e.target.value)
                                                    }

                                                    className="form-control"
                                                    placeholder="Enter marks"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={marks[key]?.Maths || ''}
                                                    onChange={(e) =>
                                                        handleMarksChange(key, 'Maths', e.target.value)
                                                    }

                                                    className="form-control"
                                                    placeholder="Enter marks"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={marks[key]?.Physics || ''}
                                                    onChange={(e) =>
                                                        handleMarksChange(key, 'Physics', e.target.value)
                                                    }

                                                    className="form-control"
                                                    placeholder="Enter marks"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={marks[key]?.IT || ''}
                                                    onChange={(e) =>
                                                        handleMarksChange(key, 'IT', e.target.value)
                                                    }

                                                    className="form-control"
                                                    placeholder="Enter marks"
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            Loading data...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button type="submit" className='btn btn-outline-danger offset-1'>
                        Submit
                    </button>
                </form>
            </section>
        </Layout>
    );
}
