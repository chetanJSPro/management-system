import React from 'react'
import "../styles/dashboard.css"
import Nav from "../components/nav"
function Readattendence() {

    var students = [
        {
            "name": "chetan sharma",
            "rollno": 22,
            "class": "cse jufu",
            "present": "true"
        },
        {
            "name": "chetan sharma",
            "rollno": 22,
            "class": "cse jufu",
            "present": "true"
        },
        {
            "name": "chetan sharma",
            "rollno": 22,
            "class": "cse jufu",
            "present": "true"
        },
        {
            "name": "chetan sharma",
            "rollno": 22,
            "class": "cse jufu",
            "present": "true"
        },

        {
            "name": "Ram Lal",
            "rollno": 22,
            "class": "cse jufu",
            "present": "false"
        },
        {
            "name": "chetan sharma",
            "rollno": 22,
            "class": "cse jufu",
            "present": "true"
        }
    ];
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className=' sidebar pe-5'>
                    <Nav />
                </div>
                <table className='col-8 mt-2'>
                    <thead>
                        <tr>
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
                                        {student.present === "true" ? "yes" : <p className='red'>No</p>}
                                    </td>
                                    <td scope="col">{student.class}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Readattendence