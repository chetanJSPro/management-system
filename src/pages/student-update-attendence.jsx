import React, { useState } from 'react';
import "../styles/scss/component.scss";
import Layout from '../components/layout';
function AddAttendence() {
    const [students, setStudents] = useState([

        {
            "id": 1,
            "name": "chetan sharma",
            "rollno": 22,
            "class": "cse jufu",
            "present": ""
        },
        {
            "id": 2,
            "name": "Rajkumar",
            "rollno": 12,
            "class": "cse fu",
            "present": ""
        },
        {
            "id": 3,
            "name": "dayanand",
            "rollno": 28,
            "class": "ce jufu",
            "present": ""
        },
        {
            "id": 4,
            "name": "aakash",
            "rollno": 92,
            "class": "ee jufu",
            "present": ""
        },

        {
            "id": 5,
            "name": "Ram Lal",
            "rollno": 22,
            "class": "cse jufu",
            "present": ""
        },
        {
            "id": 6,
            "name": "prakashlal",
            "rollno": 255,
            "class": "me jufu",
            "present": ""
        }
    ]);
    function submitForm(e) {
        const update = students.map((student) => {
            student.present = document.querySelector(`input[value="${student.name}"]:checked`) ? "yes" : "no";
            return student;
        });
        setStudents(update);
        console.log(students);
        e.preventDefault();
    }

    const today = Date.now();

    const fulldate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(today);

    return (
        <Layout>
            <form onSubmit={submitForm} id='myForm' action="" className='col-8 p-5'>
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
        </Layout >
    )
}

export default AddAttendence
