import React, { useState } from 'react';

// ...existing code...

const Markstest = ({ data }) => {
    const [selectedRollNo, setSelectedRollNo] = useState('');

    const handleRollNoChange = (event) => {
        setSelectedRollNo(event.target.value);
    };

    const filteredData = data ? Object.keys(data).filter((key) => data[key].rollNo === selectedRollNo) : [];

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Roll No"
                value={selectedRollNo}
                onChange={handleRollNoChange}
            />
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
    );
};

export default Markstest;