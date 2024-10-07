import '../styles/dashboard.css'

import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Paper,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import DeleteIcon from '@mui/icons-material/Delete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Nav from './nav';
import dayjs from 'dayjs';

function Attendance() {
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        year: '',
        rollNo: '',
        date: null,
        attendance: '',
    });

    const [tableData, setTableData] = useState(() => {
        const savedData = localStorage.getItem('tableData');
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('studenttable', JSON.stringify(tableData));
    }, [tableData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleRadioChange = (e) => {
        setFormData((prevData) => ({ ...prevData, attendance: e.target.value }));
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({ ...prevData, date }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any form field is empty
        if (!formData.name || !formData.branch || !formData.year || !formData.rollNo || !formData.date || !formData.attendance) {
            alert("Please fill out all fields.");
            return;
        }

        setTableData((prevData) => [...prevData, formData]);

        setFormData({
            name: '',
            branch: '',
            year: '',
            rollNo: '',
            date: null,
            attendance: '',
        });
    };

    const handleDelete = (index) => {
        const updatedTableData = tableData.filter((_, i) => i !== index);
        setTableData(updatedTableData);
    };

    return (
        <div className='dashboard-container'>
            <div className='row'>
                <div className='col-3'>
                    <Nav />
                </div>
                <div className='col-9'>
                    <Box sx={{ flexGrow: 1 }} my={8} p={2}>
                        <h1>   Attendance Form</h1>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="standard"
                                            value={formData.name}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="branch"
                                            label="Branch"
                                            variant="standard"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="year"
                                            label="Year"
                                            variant="standard"
                                            value={formData.year}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="rollNo"
                                            label="Roll no."
                                            variant="standard"
                                            value={formData.rollNo}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateField']}>
                                                <DateField
                                                    label="Today's Date"
                                                    id="date"
                                                    variant="standard"
                                                    value={formData.date}
                                                    onChange={handleDateChange}
                                                    fullWidth
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl>
                                            <FormLabel>Attendance</FormLabel>
                                            <RadioGroup
                                                row
                                                name="attendance"
                                                value={formData.attendance}
                                                onChange={handleRadioChange}
                                            >
                                                <FormControlLabel value="Attended" control={<Radio />} label="Attended" />
                                                <FormControlLabel value="Half day Attended" control={<Radio />} label="Half day Attended" />
                                                <FormControlLabel value="Not Attended" control={<Radio />} label="Not Attended" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} container justifyContent="center">
                                        <Button variant='contained' color="secondary" type="submit">Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>

                        <Typography variant="h5" gutterBottom mt={5}>
                            Attendance Records
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Branch</TableCell>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Roll no.</TableCell>
                                        <TableCell>Today's Date</TableCell>
                                        <TableCell>Attendance</TableCell>
                                        <TableCell>Delete Option    </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.length > 0 ? (
                                        tableData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.branch}</TableCell>
                                                <TableCell>{row.year}</TableCell>
                                                <TableCell>{row.rollNo}</TableCell>
                                                <TableCell>{row.date ? dayjs(row.date).format('MM/DD/YYYY') : ''}</TableCell>
                                                <TableCell>{row.attendance}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleDelete(index)} aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                No attendance records found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
