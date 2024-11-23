import React, { useState } from 'react'
import Layout from '../components/layout'

export default function Studentcheckatt() {
    const attendance = [
        { date: "2024-03-06", status: "A" },
        { date: "2024-03-06", status: "P" },
        { date: "2024-03-07", status: "P" },
        { date: "2024-03-07", status: "P" },
        { date: "2024-03-10", status: "A" },
        { date: "2024-03-11", status: "P" },
        { date: "2024-03-11", status: "A" },
        { date: "2024-03-11", status: "P" },
        { date: "2024-03-12", status: "P" },
        { date: "2024-03-12", status: "P" },
        { date: "2024-03-13", status: "A" },
        { date: "2024-03-13", status: "P" },
        { date: "2024-03-14", status: "P" },
        { date: "2024-03-14", status: "P" },
        { date: "2024-03-22", status: "A" },
        { date: "2024-03-26", status: "P" },
        { date: "2024-03-26", status: "P" },
        { date: "2024-03-27", status: "A" },
        { date: "2024-03-27", status: "P" },
        { date: "2024-03-28", status: "P" },
        { date: "2024-03-28", status: "P" },
        { date: "2024-03-29", status: "A" },
        { date: "2024-04-01", status: "A" },
        { date: "2024-04-01", status: "P" },
        { date: "2024-04-01", status: "P" },
        { date: "2024-04-02", status: "P" },
        { date: "2024-04-02", status: "P" },
        { date: "2024-04-02", status: "P" },
        { date: "2024-04-03", status: "A" },
        { date: "2024-04-03", status: "P" },
        { date: "2024-04-03", status: "P" },
        { date: "2024-04-04", status: "P" },
        { date: "2024-04-04", status: "P" },
        { date: "2024-04-05", status: "A" },
        { date: "2024-04-05", status: "P" },
        { date: "2024-04-08", status: "P" },
        { date: "2024-04-08", status: "A" }
    ];
    const [color, setcolor] = useState();
    function setcol() {
        attendance.map((entr) => {
            if (entr.status == "A") {
                setcolor("text-danger");
            } else {
                setcolor("text-success");
            }
        })
    }

    return (
        <Layout>
            <div className='col-6 col-sm-8 mt-5 ms-5'>
                <div className='row'>
                    <h1 className='col-12 mb-5'>Check Your Attendence</h1>
                    <div className="form-floating mb-3 col-sm-3">
                        <input type="date" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label className='ms-3' for="floatingInput">start date</label>
                    </div>
                    <div className="form-floating col-sm-3">
                        <input type="date" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label className='ms-3' for="floatingPassword">End date</label>
                    </div>
                    <div className="form-floating col-sm-3">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>----</option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                            <option value="5">5th</option>
                            <option value="6">6th</option>
                        </select>
                        <label className='ms-3' for="floatingPassword">Select</label>
                    </div>
                    <h3 className='mt-5 mb-5'>Attendence</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">date</th>
                                <th scope="col">present</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((entries) => {
                                return <tr><td>{entries.date}</td><td className={color}>{entries.status}</td></tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout >
    )
}
