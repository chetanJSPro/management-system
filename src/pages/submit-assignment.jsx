import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import { getDatabase, ref as dataRef, onValue, update } from "firebase/database";
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography, CircularProgress, Alert, Box, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { storage } from '../firebaseconf';
import Header from '../components/header';
import Preloader from '../components/preloader';
import Layout from '../components/layout';

export default function SubmitAssignment() {
    const [file, setFile] = useState(null);
    const [Url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [newAssignment, setNewAssignment] = useState({});
    const [rollno, setRollno] = useState('');
    const [data, setData] = useState();
    const [assignments, setAssignments] = useState([]);
    const [formvisible, setFormVisible] = useState(false);

    useEffect(() => {
        const studentRef = dataRef(getDatabase(), "assignments");
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, []);

    const today = new Date();
    const fulldate = today.toISOString().split('T')[0];

    const handleAssignmentChange = (key, value) => {
        setNewAssignment((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        const storagedataRef = storageRef(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storagedataRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                alert("Upload failed: " + error.message);
            },
            async () => {
                alert("Upload successful!");
                const ImageURL = await getDownloadURL(storagedataRef);
                setUrl(ImageURL);
                handleAssignmentChange("pdfUrl", ImageURL);
            }
        );
    };

    const handleSubmitchange = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const database = getDatabase();
            const assignmentsRef = dataRef(database, `assignments/${assignments}/submissions/${rollno}`);
            const assignmentWithDate = {
                ...newAssignment,
                submittedDate: fulldate,
                marksAwarded: "",
                pdfUrl: Url,
                checked: false,
            };

            await update(assignmentsRef, assignmentWithDate);
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
        } catch (error) {
            console.error("Error submitting assignment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Submit Assignment" />
            {alertVisible && <Alert severity="success" sx={{ mb: 2 }}>Assignment submitted successfully!</Alert>}
            {loading && <Preloader />}

            <Typography variant="h5" sx={{ textTransform: 'uppercase', mt: 4, textAlign: "center" }}>
                All Assignments:
            </Typography>

            {data ? (
                Object.keys(data).map((key, index) => (
                    <Accordion key={key} sx={{ mt: 2, boxShadow: 4 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${index}-content`}
                            id={`panel-${index}-header`}
                        >
                            <Typography>{index + 1}. {data[key].title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{data[key].description}</Typography>
                            <Button
                                onClick={() => { setFormVisible(true); setAssignments(key); }}
                                variant="outlined"
                                sx={{ mt: 2 }}
                            >
                                Submit Assignment
                            </Button>
                            {formvisible && assignments === key && (
                                <Box
                                    component="form"
                                    onSubmit={handleSubmitchange}
                                    sx={{
                                        mt: 2,
                                        width: "100%", // Full width of the parent container
                                        maxWidth: "70%", // Optional: Limit maximum form width
                                        margin: "0 auto", // Center the form
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        {/* Roll Number Input */}
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                type="number"
                                                label="Roll Number"
                                                required
                                                fullWidth
                                                onChange={(e) => setRollno(e.target.value)}
                                                sx={{
                                                    "& .MuiInputBase-root": {
                                                        height: "45px", // Adjust input height
                                                    },
                                                }}
                                            />
                                        </Grid>

                                        {/* Upload File Button */}
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                fullWidth
                                                sx={{
                                                    height: "45px", // Consistent button height
                                                    textTransform: "none", // Keep text casing natural
                                                }}
                                            >
                                                Upload Assignment
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept=".pdf"
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                />
                                            </Button>
                                        </Grid>

                                        {/* Upload Confirmation */}
                                        <Grid item xs={12}>
                                            <Button
                                                variant="outlined"
                                                onClick={handleSubmit}
                                                fullWidth
                                                sx={{
                                                    height: "45px",
                                                }}
                                            >
                                                Upload File
                                            </Button>
                                            {Url && (
                                                <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                                                    Uploaded! Your file URL:{" "}
                                                    <a href={Url} target="_blank" rel="noopener noreferrer">
                                                        {Url}
                                                    </a>
                                                </Typography>
                                            )}
                                        </Grid>

                                        {/* Submit Button */}
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                disabled={loading || !Url}
                                                sx={{
                                                    height: "45px",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {loading ? <CircularProgress size={24} /> : "Submit"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography sx={{ mt: 4, textAlign: "center" }}>Loading data...</Typography>
            )}
        </Layout>
    );
}
