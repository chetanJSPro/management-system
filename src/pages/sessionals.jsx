import { onValue, ref, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { database } from "../firebaseconf";
import Layout from "../components/layout";
import Alert from "../components/alert";
import Preloader from "../components/preloader";
import Header from "../components/header";

export default function Sessionals() {
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

    const handlesessionalsChange = (subject, rollNo, value) => {
        setsessionals((prev) => ({
            ...prev,
            [rollNo]: {
                ...(prev[rollNo]),
                [subject]: value,
            },
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
            const sessionalsdata = {};
            Object.values(data).forEach((student) => {
                const rollNo = student.rollNo;
                if (sessionals[rollNo]) {
                    sessionalsdata[rollNo] = {
                        ...sessionals[rollNo],
                    };
                }
            });

            const sessionalRef = ref(database, `sessionalsMarks/${selectedSemester}/${selectedSubject}`);
            await update(sessionalRef, sessionalsdata);

            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
        } catch (error) {
            console.error("Error updating sessionals:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Update Student Sessionals" />
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

                    {Object.keys(subjects).length > 0 ? (
                        <div className="form-group form-floating col-5 ms-3">
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
                        null)}
                    <form onSubmit={handleSubmit} className="col-10 mt-4">
                        <div className="row justify-content-center ms-3">
                            {selectedSubject ? <table className="table table-hover table-responsive">
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
                                                                handlesessionalsChange(sub.subject, data[key].rollNo, e.target.value)
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
