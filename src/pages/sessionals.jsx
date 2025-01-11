import { onValue, ref, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { database } from "../firebaseconf";
import Layout from "../components/layout";
import Alert from "../components/alert";
import Preloader from "../components/preloader";

export default function Test() {
    // subject stands for sessionals

    const [data, setData] = useState(null);
    const [sessionals, setsessionals] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
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
            const subjectRef = ref(database, `sessionals/${selectedSemester}/${selectedSubject}`);
            onValue(subjectRef, (snapshot) => {
                const data = snapshot.val();
                setSessionalSubjects(data);
            });
        }
    },
        [selectedSemester, selectedSubject]); // to run on change in semester feild
    console.log(sessionalsubjects);

    useEffect(() => {
        if (selectedSemester) {
            const subjectRef = ref(database, `sessionals/${selectedSemester}`);
            onValue(subjectRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setSubjects(Object.keys(data));
                } else {
                    setSubjects([]);
                }
            });
        }
    }, [selectedSemester]);

    const handlesessionalsChange = (subject, value) => {
        setsessionals((prev) => ({
            ...prev,
            [subject]: value,
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
            const updatePromises = Object.keys(sessionals).map((studentId) => {
                const studentRef = ref(
                    database,
                    `students/${studentId}/sessionals/${selectedSemester}`
                );
                return update(studentRef, sessionals[studentId][selectedSemester]);
            });

            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
            await Promise.all(updatePromises);

            const dataRef = ref(database, "students");
            onValue(dataRef, (snapshot) => {
                const updatedData = snapshot.val();
                setData(updatedData);
                console.log("Updated Data:", updatedData);
            });
        } catch (error) {
            console.error("Error updating sessionals:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <section className="col-8 pt-5">
                <h1 className="text-center mb-4">Update Student Sessionals</h1>
                {alertVisible && <Alert message="Form submitted successfully!" />}
                {loading && <Preloader />}
                <div className="form-group form-floating">
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

                {Object.keys(subjects).length > 0 ? (
                    <div className="form-group form-floating mt-3">
                        <select required id="subject floatingSelect" className="form-select" aria-label="Floating label select example" value={selectedSubject} onChange={
                            (e) => setSelectedSubject(e.target.value)
                        } >
                            <option value="">
                                -----------
                            </option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelect">Select sessionals:</label>
                    </div>
                ) : (
                    <p className="text-info-emphasis p-3">Select Semester</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center ms-3">
                        <table className="table table-hover table-responsive">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    {Object.values(sessionalsubjects).map((sub) => (
                                        <th key={sub}>{sub.subject}</th>
                                    )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {data ? (
                                    Object.keys(data).map((key, index) => (
                                        <tr key={key}>
                                            <td>{index + 1}</td>
                                            <td>{data[key].Name}</td>
                                            <td>{data[key].rollNo}</td>
                                            {Object.entries(sessionalsubjects).map((sub) => (
                                                <td >
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={sessionals[key]?.[selectedSemester]?.[sub[0]] || ""}
                                                        onChange={(e) =>
                                                            handlesessionalsChange(key, {
                                                                ...sessionals[key]?.[selectedSemester],
                                                                [sub[0]]: e.target.value,
                                                            })
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
                        </table>
                    </div>
                    <button type="submit" className="btn btn-outline-danger offset-1">
                        Submit
                    </button>
                </form>
            </section>
        </Layout>
    );
}
