import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Delete as DeleteIcon } from '@mui/icons-material';
import Nav from './nav';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
});

function StudentFees() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        rollNo: '',
        fullName: '',
        parent: '',
        streetAddress: '',
        paymentStatus: '',
        phone: ''
    });

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students'));
        if (storedStudents) {
            setStudents(storedStudents);
        }
    }, []);

    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleAddStudent = () => {
        if (
            newStudent.rollNo &&
            newStudent.fullName &&
            newStudent.parent &&
            newStudent.streetAddress &&
            newStudent.paymentStatus &&
            newStudent.phone
        ) {
            const updatedStudents = [...students, newStudent];
            setStudents(updatedStudents);
            localStorage.setItem('students', JSON.stringify(updatedStudents));
            setNewStudent({
                rollNo: '',
                fullName: '',
                parent: '',
                streetAddress: '',
                paymentStatus: '',
                phone: ''
            });
        } else {
            alert('Please fill in all fields before adding a student.');
        }
    };

    const handleDeleteStudent = (rollNo) => {
        const updatedStudents = students.filter(student => student.rollNo !== rollNo);
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
    };

    return (
    <div className='row'>
                <div className='col-3'>
                    <Nav />
                </div>
                <div className='col-9'>
                    <h2>Students</h2>
                    <Box sx={{ flexGrow: 1 }} my={8} p={2}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField variant="standard" label="Roll No" name="rollNo" value={newStudent.rollNo} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant="standard" label="Full Name" name="fullName" value={newStudent.fullName} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant="standard" label="Parent" name="parent" value={newStudent.parent} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant="standard" label="Street Address" name="streetAddress" value={newStudent.streetAddress} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant="standard" label="Payment Status" name="paymentStatus" value={newStudent.paymentStatus} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField variant="standard" label="Phone" name="phone" value={newStudent.phone} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" onClick={handleAddStudent}>Add Student</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Roll No.</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Parent</TableCell>
                                    <TableCell>Street Address</TableCell>
                                    <TableCell>Payment Status</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map(student => (
                                    <TableRow key={student.rollNo}>
                                        <TableCell>{student.rollNo}</TableCell>
                                        <TableCell>{student.fullName}</TableCell>
                                        <TableCell>{student.parent}</TableCell>
                                        <TableCell>{student.streetAddress}</TableCell>
                                        <TableCell>{student.paymentStatus}</TableCell>
                                        <TableCell>{student.phone}</TableCell>
                                        <TableCell>
                                            <IconButton color="secondary" onClick={() => handleDeleteStudent(student.rollNo)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        </div>
    );
};

export default StudentFees;
