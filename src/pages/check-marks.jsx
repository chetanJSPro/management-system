import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { onValue, ref, set, update } from 'firebase/database';
import { database } from '../firebaseconf';
import { Filter } from '@mui/icons-material';

export default function StudentCheckMarks() {
    const [data, setData] = useState([]);
    const [rollNo, setRollNo] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const dataRef = ref(database, 'students');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            setData(fetchedData);
        });

        return () => unsubscribe();
    }, []);

    // console.log(data);
    function handleChange(e) {
        setRollNo(e.target.value);
    }

    function handleSubmit() {
        if (data) {
            const filtered = Object.keys(data).filter((key) => data[key].rollNo === rollNo);

            setFilteredData(filtered);
        }
    }

    return (
        <Layout>
            <section className='col-12 pt-5 mx-auto'>
                <h1 className='text-center mb-4'>Check Marks</h1>

                <div class="form-floating mb-3 col-7">
                    <input onChange={handleChange} type="number" class="form-control" id="floatingInput" placeholder="123456789" />
                    <label for="floatingInput">Roll no.</label>
                </div>

                <button type="submit" className='w-25  btn btn-outline-dark mb-5' onClick={handleSubmit}>Submit</button>

                <div className='row justify-content-center table-responsive '>
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
                        {/* <tbody>
                            {data ? (
                                Object.keys(data).map((marks, index) => (
                                    <tr key={marks}>
                                        <td>{index + 1}</td>
                                        <td>{data[marks].Name || 'N/A'}</td>
                                        <td>{data[marks].rollNo || 'N/A'}</td>
                                        <td>
                                            {data[marks].marks.English || 'N/A'}
                                        </td>
                                        <td>
                                            {data[marks].marks.Maths || 'N/A'}
                                        </td>
                                        <td>
                                            {data[marks].marks.Physics || 'N/A'}
                                        </td>
                                        <td>
                                            {data[marks].marks.IT || 'N/A'}
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
                        </tbody> */}
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((marks, index) => (
                                    <tr key={marks}>
                                        <td>{index + 1}</td>
                                        <td>{data[marks].Name || 'N/A'}</td>
                                        <td>{data[marks].rollNo || 'N/A'}</td>
                                        <td>{data[marks].marks.English || 'N/A'}</td>
                                        <td>{data[marks].marks.Maths || 'N/A'}</td>
                                        <td>{data[marks].marks.Physics || 'N/A'}</td>
                                        <td>{data[marks].marks.IT || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </section>
        </Layout>
    );
}
