import React, { useEffect, useState } from 'react';
import "../styles/scss/component.scss";
import Layout from '../components/layout';
import { ref, onValue, update, get } from 'firebase/database';
import { database } from '../firebaseconf';
import Header from '../components/header';

import Alert from "../components/alert";
import Preloader from '../components/preloader';
function SemesterWiseAttendance() {
    const today = new Date();
    const fulldate = today.toISOString().split('T')[0];
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [students, setStudents] = useState({});
    const [attendance, setAttendance] = useState({});

    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const subjectsRef = ref(database, 'subjects');
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
                setSubjects(data);
            });
        }
    },
        [selectedSemester]); // to run on change in semester feild

    useEffect(() => {
        const studentRef = ref(database, 'students');
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setStudents(data);
        });
    }, []);
    const checksubject = (key) => {
        return key.replace(/[./#$\[\]]/g, '_');
    };

    const handleAttendanceChange = (id, value) => {
        const checkedsub = checksubject(selectedSubject);
        console.log(checkedsub);

        setAttendance((prev) => ({
            ...prev,
            [id]: {
                ...(prev[id]),
                Attendance: {
                    [selectedSemester]: {
                        ...(prev[id]?.Attendance?.[selectedSemester]),
                        [checkedsub]: {
                            ...(prev[id]?.Attendance?.[selectedSemester]?.[checkedsub]),
                            date: fulldate,
                            Status: value,
                        }
                    }
                }
            }
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const checkedsub = checksubject(selectedSubject);
        console.log(checkedsub);
        try {
            for (const studentId of Object.keys(students)) {
                const studentRef = ref(database, `students/${studentId}`);

                const studentDataSnapshot = await get(studentRef);
                const studentData = studentDataSnapshot.val();

                if (studentData) {
                    const updatedStudentData = {
                        ...studentData,
                        Attendance: {
                            ...(studentData?.Attendance || {}),
                            [selectedSemester]: {
                                ...(studentData?.Attendance?.[selectedSemester] || {}),
                                [checkedsub]: {
                                    ...(studentData?.Attendance?.[selectedSemester]?.[checkedsub]),
                                    date: fulldate,
                                    Status: attendance[studentId]?.Attendance?.[selectedSemester]?.[checkedsub]?.Status || false,
                                }
                            }
                        }
                    };

                    await update(studentRef, updatedStudentData);
                }
            }

            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
            setTimeout(() => window.location.reload(), 3500);
        } catch (error) {
            console.error('Error updating attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Update Attendance" />
            {alertVisible && <Alert message="Form submitted successfully!" />}
            {loading && <Preloader />}
            <form id="attendanceForm" onSubmit={submitForm} className="col-12 p-5">
                <p>Today: {fulldate}</p>
                <div className='row'>
                    <div className="form-group form-floating col-5">
                        <select aria-label="Floating label select example" required id="semester" className="form-select" value={selectedSemester} onChange={(e) =>
                            setSelectedSemester(e.target.value)
                        }

                        >
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

                    {subjects.length > 0 ? (
                        <div className="form-group form-floating ms-3 col-5">
                            <select required id="subject floatingSelect" className="form-select" aria-label="Floating label select example" value={selectedSubject} onChange={
                                (e) => setSelectedSubject(e.target.value)
                            } >
                                <option value="">
                                    -----------
                                </option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.subject}>
                                        {subject.subject}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="floatingSelect">Select Subject:</label>
                        </div>
                    ) : (
                        <p className="text-info-emphasis p-3">Select Semester</p>
                    )}

                    {selectedSubject ? (
                        <><table className="table table-hover table-responsive text-center mt-4">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Roll No</th>
                                    <th scope="col">{selectedSubject} Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(students).length > 0 ? (
                                    Object.keys(students).map((student) => (
                                        <tr key={students[student].rollNo}>
                                            <td>{students[student].Name}</td>
                                            <td>{students[student].rollNo}</td>
                                            <td>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"

                                                        id={students[student].rollNo}
                                                        name={students[student].rollNo}
                                                        value="present"
                                                        className="form-check-input"
                                                        onChange={() => handleAttendanceChange(student, 'present')} />
                                                    <label className="form-check-label" htmlFor={students[student].rollNo}>
                                                        Present
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id={students[student].rollNo}
                                                        name={students[student].rollNo}
                                                        value="absent"
                                                        className="form-check-input"
                                                        onChange={() => handleAttendanceChange(student, 'absent')} />
                                                    <label className="form-check-label" htmlFor={students[student].rollNo}>
                                                        Absent
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            Loading data...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                            <button type="submit" className="btn col-3 btn-success text-uppercase">
                                Submit Attendance
                            </button>
                        </>
                    ) : (selectedSemester ? (
                        <p className="text-info-emphasis p-3">Select Subject</p>
                    )
                        : ("")
                    )}
                </div>
            </form>
        </Layout>
    );
}

export default SemesterWiseAttendance;
