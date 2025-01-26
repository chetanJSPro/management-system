import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Snackbar, CircularProgress } from '@mui/material';
import { Alert as MuiAlert } from '@mui/material';
import Layout from '../components/layout';
import fireConfig from "../firebaseconf";
import { getDatabase, ref, onValue, push } from "firebase/database";
import Header from '../components/header';

export default function StudentForm() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [newStudent, setNewStudent] = useState({
        Name: '', email: '', rollNo: '', Mothername: '', Fathername: '', Branch: '', phoneNo: '', address: '', DOB: ''
    });

    useEffect(() => {
        const database = getDatabase(fireConfig);
        const collectionRef = ref(database, "students");

        const unsubscribe = onValue(collectionRef, (snapshot) => {
            const dataItem = snapshot.val();
            if (dataItem) {
                const displayItem = Object.keys(dataItem).map(key => ({
                    id: key,
                    ...dataItem[key]
                }));
                setData(displayItem);
                console.log("Fetched data with IDs:", displayItem);
            } else {
                setData([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setLoading(true);
        const database = getDatabase(fireConfig);
        const collectionRef = ref(database, "students");

        try {
            const newStudentRef = await push(collectionRef, newStudent);
            console.log("Student added with ID:", newStudentRef.key);
            setNewStudent({
                Name: '', email: '', rollNo: '', Mothername: '', Fathername: '', Branch: '', phoneNo: '', address: '', DOB: ''
            });
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
        } catch (error) {
            console.error("Error adding student:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Add Student" />
            <Box component="section" sx={{ p: 5 }}>
                {alertVisible && (
                    <Snackbar open={alertVisible} autoHideDuration={3000} onClose={() => setAlertVisible(false)}>
                        <MuiAlert severity="success" variant="filled">
                            Form submitted successfully!
                        </MuiAlert>
                    </Snackbar>
                )}
                {loading && <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />}
                <form onSubmit={handleAddStudent}>
                    <Typography variant="h5" gutterBottom>
                        Add Student Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Student Name"
                                name="Name"
                                value={newStudent.Name}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={newStudent.email}
                                onChange={handleChange}
                                variant="outlined"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Roll No."
                                name="rollNo"
                                value={newStudent.rollNo}
                                onChange={handleChange}
                                variant="outlined"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Mother's Name"
                                name="Mothername"
                                value={newStudent.Mothername}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Father's Name"
                                name="Fathername"
                                value={newStudent.Fathername}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Branch"
                                name="Branch"
                                value={newStudent.Branch}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone No."
                                name="phoneNo"
                                value={newStudent.phoneNo}
                                onChange={handleChange}
                                variant="outlined"
                                type="tel"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="DOB"
                                value={newStudent.DOB}
                                onChange={handleChange}
                                variant="outlined"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={newStudent.address}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
