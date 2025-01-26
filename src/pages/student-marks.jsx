import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { get, onValue, ref, update } from 'firebase/database';
import { database } from '../firebaseconf';
import Preloader from '../components/preloader';
import Alert from '../components/alert';
import Header from '../components/header';

export default function Updatemarks() {
    const [data, setData] = useState(null);
    const [sessionals, setsessionals] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [sessionalsubjects, setSessionalSubjects] = useState([]);

    useEffect(() => {
        const subjectsRef = ref(database, 'sessionals');
        onValue(subjectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const semesterKeys = Object.keys(data);
                setSemesters(semesterKeys);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedSemester) {
            const subjectRef = ref(database, `subjects/${selectedSemester}`);
            onValue(subjectRef, (snapshot) => {
                const data = snapshot.val();
                setSessionalSubjects(data);
            });
        }
    },
        [selectedSemester]);
    console.log(sessionalsubjects); // to run on change in semester feild

    const checksubject = (key) => {
        return key.replace(/[./#$\[\]]/g, '_');
    };

    const handlesessionalsChange = (subject, id, value) => {
        const checkedsub = checksubject(subject);
        setsessionals((prev) => ({
            ...prev,
            [id]: {
                ...(prev[id]),
                FinalMarks: {
                    [selectedSemester]: {
                        ...(prev[id]?.FinalMarks?.[selectedSemester]),
                        [checkedsub]: value,
                    }
                }
            }
        }));
    };
    useEffect(() => {
        const studentRef = ref(database, 'students');
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            for (const studentId of Object.keys(data)) {
                const studentRef = ref(database, `students/${studentId}`);

                const studentDataSnapshot = await get(studentRef);
                const studentData = studentDataSnapshot.val();

                if (studentData) {
                    const updatedStudentData = {
                        ...studentData,
                        FinalMarks: {
                            ...(studentData?.FinalMarks || {}),
                            [selectedSemester]: sessionals[studentId]?.FinalMarks?.[selectedSemester] || {},
                        }
                    };

                    await update(studentRef, updatedStudentData);
                }
            }

            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
            setTimeout(() => window.location.reload(), 3500);
        } catch (error) {
            console.error("Error updating sessionals:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Update Final Marks" />
            <section className="col-12 pt-5">
                <div className="row justify-content-center">

                    {alertVisible && <Alert message="Form submitted successfully!" />}
                    {loading && <Preloader />}
                    <div className="form-group form-floating col-5 ms-3">
                        <select aria-label="Floating label select example" required id="semester" className="form-select" value={selectedSemester} onChange={(e) =>
                            setSelectedSemester(e.target.value)
                        }>
                            <option value="" selected>
                                -----------
                            </option>
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelect">Select Semester:</label>
                    </div>

                    <form onSubmit={handleSubmit} className="col-10 mt-4">
                        <div className="row justify-content-center ms-3">
                            {selectedSemester ? <table className="table table-hover table-responsive">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Roll No</th>
                                        {Object.values(sessionalsubjects).map((sub) => (

                                            <th key={sub.id}>{sub.subject}</th>
                                        )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data ? (
                                        Object.keys(data).map((key, index) => (
                                            <tr key={key.id}>
                                                <td>{index + 1}</td>
                                                <td>{data[key].Name}</td>
                                                <td>{data[key].rollNo}</td>
                                                {Object.values(sessionalsubjects).map((sub) => (
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                handlesessionalsChange(sub.subject, key, e.target.value)
                                                            }

                                                        />
                                                    </td>
                                                ))}

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
                                <button type="submit" className="btn btn-outline-danger offset-1 ">
                                    Submit
                                </button>
                            </table>
                                : null}
                        </div>
                    </form>
                </div>
            </section>
        </Layout >
    );
}
