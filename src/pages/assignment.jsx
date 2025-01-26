import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import fireConfig, { database } from "../firebaseconf";
import { getDatabase, ref, onValue, push, get, update } from "firebase/database";
import Preloader from "../components/preloader";
import Alert from "../components/alert";
import Header from "../components/header";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloseIcon from '@mui/icons-material/Close';

export default function Assignment() {
    const today = new Date();
    const fulldate = today.toISOString().split('T')[0];
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedSubject, setselectedSubject] = useState([]);
    const [students, setStudents] = useState({});
    const [data, setData] = useState();
    const [formVisible, setFormVisible] = useState(false);
    const [checkedsub, setCheckedSub] = useState();
    const [Subject, setSubject] = useState([]);
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        description: "",
        subject: "",
        semester: "",
        deadline: "",
        Grades: "",
    });
    useEffect(() => {
        const studentRef = ref(database, 'students');
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setStudents(data);
        });
    }, []);

    useEffect(() => {
        const database = getDatabase(fireConfig);
        const semesterRef = ref(database, "sessionals");

        onValue(semesterRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSemesters(Object.keys(data));
            }
        });
    }, []);

    useEffect(() => {
        if (selectedSemester) {
            const database = getDatabase(fireConfig);
            const subjectRef = ref(database, `subjects/${selectedSemester}`);

            onValue(subjectRef, (snapshot) => {
                const data = snapshot.val();
                setselectedSubject(data || []);
            });
        } else {
            setselectedSubject([]);
        }
    }, [selectedSemester]);

    const checksubject = (key) => {
        return key.toString().replace(/[./#$\[\]]/g, '_');
    };

    const handleAssignmentChange = (key, value) => {
        setCheckedSub(checksubject(Subject));
        console.log(checkedsub);
        setNewAssignment((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    useEffect(() => {
        const studentRef = ref(database, "students");
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            const students = Object.values(data).map((student) => student.Assignment) || {};
            setData(students);
            console.log(students);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(newAssignment.deadline) < new Date(fulldate)) {
            alert("Error: Deadline cannot be earlier than the creation date.");
            return;
        }

        setLoading(true);

        try {
            for (const studentId of Object.keys(students)) {
                const studentRef = ref(database, `students/${studentId}`);

                const studentDataSnapshot = await get(studentRef);
                const studentData = studentDataSnapshot.val();

                if (studentData) {
                    const updatedStudentData = {
                        ...studentData,
                        Assignment: {
                            ...(studentData?.Assignment || {}),
                            [selectedSemester]: {
                                ...(studentData?.Assignment?.[selectedSemester] || {}),
                                [checkedsub]: {
                                    ...(studentData?.Assignment?.[selectedSemester]?.[checkedsub]),
                                    ...newAssignment,
                                    createdDate: fulldate,
                                }
                            }
                        }
                    };

                    await update(studentRef, updatedStudentData);
                }
            }

            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
            setTimeout(() => window.location.reload(), 3500);
        } catch (error) {
            console.error("Error submitting assignment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Add Assignment" />
            <Box sx={{ padding: "2rem" }}>
                {alertVisible && <Alert message="Assignment submitted successfully!" />}
                {loading && <Preloader />}

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setFormVisible((prev) => !prev)}
                    sx={{ marginBottom: "1rem" }}
                >
                    {formVisible ? <CloseIcon /> : <PostAddIcon />}
                    {formVisible ? "Hide Form" : "Add Assignment"}
                </Button>

                {formVisible && (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Assignment Title"
                                    value={newAssignment.title}
                                    onChange={(e) => handleAssignmentChange("title", e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    type="date"
                                    label="Deadline"
                                    InputLabelProps={{ shrink: true }}
                                    value={newAssignment.deadline}
                                    onChange={(e) => handleAssignmentChange("deadline", e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    type="number"
                                    label="Grade"
                                    value={newAssignment.Grades}
                                    onChange={(e) => handleAssignmentChange("Grades", e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Select Semester</InputLabel>
                                    <Select
                                        value={selectedSemester}
                                        onChange={(e) => { handleAssignmentChange("semester", e.target.value); setSelectedSemester(e.target.value); }}
                                        required >
                                        <MenuItem value="">Select Semester</MenuItem>
                                        {semesters.map((semester) => (
                                            <MenuItem key={semester} value={semester}>{semester}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Select Subject</InputLabel>
                                    <Select
                                        value={newAssignment.subject}
                                        onChange={(e) => { handleAssignmentChange("subject", e.target.value); setSubject(e.target.value); }}
                                        required
                                        disabled={!selectedSubject.length}
                                    >
                                        <MenuItem value="">Select Subject</MenuItem>
                                        {Object.values(selectedSubject).map((subject, index) => (
                                            <MenuItem key={index} value={subject.subject}>{subject.subject}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={newAssignment.description}
                                    onChange={(e) => handleAssignmentChange("description", e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}

                <Typography variant="h5" sx={{ textTransform: 'uppercase', marginTop: "2rem", textAlign: "center" }}>
                    Previous Assignments:
                </Typography>

                {data ? (
                    Object.keys(data).map((key, index) => (
                        <Accordion key={key} sx={{ marginTop: "1rem", boxShadow: 4 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-${index}-content`}
                                id={`panel-${index}-header`}
                            >
                                <Typography>{index + 1}. {data[key]}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{data[key].description}</Typography>
                                <Button variant="outlined" sx={{ marginTop: "1rem" }}>
                                    Check Submissions
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Typography>Loading data...</Typography>
                )}
            </Box>
        </Layout >
    );
}
