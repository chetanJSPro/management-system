import React from 'react'
import "../styles/scss/component.scss";
import Layout from '../components/layout';
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
        <Layout>
            <section className='col-12 pt-5'>
                <table className='table table-hover table-responsive'>
                    <thead className='table-light'>
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
                                        {student.present === "true" ? "yes" : <div className='red'>No</div>}
                                    </td>
                                    <td scope="col">{student.class}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </section>
        </Layout >
    )

}

export default Readattendence