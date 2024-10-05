// src/components/StudentMarks.js

import { Box, Button, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import { styled } from '@mui/system';

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderLeft: '5px solid #3f51b5',
}));

const PublishButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
}));

const StudentMarks = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', rollNo: '87654321', submissionDate: 'April 20, 2023 10:30 AM', assignment: 'Assignment 01', marks: '87 / 100' },
    { id: 2, name: 'Bob', rollNo: '87654322', submissionDate: 'April 20, 2023 11:00 AM', assignment: 'Assignment 02', marks: '92 / 100' },
    { id: 3, name: 'Charlie', rollNo: '87654323', submissionDate: 'April 21, 2023 09:00 AM', assignment: 'Assignment 03', marks: '78 / 100' },
    { id: 4, name: 'David', rollNo: '87654324', submissionDate: 'April 21, 2023 10:00 AM', assignment: 'Assignment 04', marks: '85 / 100' },
    { id: 5, name: 'Eve', rollNo: '87654325', submissionDate: 'April 22, 2023 11:30 AM', assignment: 'Assignment 05', marks: '91 / 100' },
  ]);

  // Function to handle date storage in localStorage
  const handleSetDate = (studentId, newDate) => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, submissionDate: newDate } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  // Function to handle deletion of a student
  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>Student Marks</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={3}>
          <CustomCard>
            <CardContent>
              <Typography variant="h6">Assignment Received</Typography>
              <Typography variant="h4">43</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={3}>
          <CustomCard>
            <CardContent>
              <Typography variant="h6">Yet to Review</Typography>
              <Typography variant="h4">13</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={3}>
          <CustomCard>
            <CardContent>
              <Typography variant="h6">Evaluated Assignments</Typography>
              <Typography variant="h4">20</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={3}>
          <CustomCard>
            <CardContent>
              <Typography variant="h6">Yet to Evaluate</Typography>
              <Typography variant="h4">10</Typography>
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Roll No.</TableCell>
              <TableCell>Date of Submission</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>
                  {/* Display editable date input */}
                  <input
                    type="text"
                    value={student.submissionDate}
                    onChange={(e) => handleSetDate(student.id, e.target.value)}
                  />
                </TableCell>
                <TableCell>{student.assignment}</TableCell>
                <TableCell>{student.marks}</TableCell>
                <TableCell>
                  {/* Delete icon button */}
                  <DeleteIcon color="error" onClick={() => handleDeleteStudent(student.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentMarks;
