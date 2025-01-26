
import { onValue, ref, get, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import { database } from "../firebaseconf";
import Layout from "../components/layout";
import Alert from "../components/alert";
import Preloader from "../components/preloader";
import Header from "../components/header";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    useMediaQuery,
    useTheme,
} from "@mui/material";

export default function Sessionals() {
    const [data, setData] = useState(null);
    const [sessionals, setsessionals] = useState({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [sessionalsubjects, setSessionalSubjects] = useState([]);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const subjectsRef = ref(database, 'sessionals');
        onValue(subjectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const semesterKeys = Object.keys(data);
                setSemesters(semesterKeys);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedSemester) {
            const subjectRef = ref(database, `sessionals/${selectedSemester}/${selectedSubject}`);
            onValue(subjectRef, (snapshot) => {
                const data = snapshot.val();
                setSessionalSubjects(data);
            });
        }
    }, [selectedSemester, selectedSubject]);

    useEffect(() => {
        if (selectedSemester) {
            const subjectRef = ref(database, `sessionals/${selectedSemester}`);
            onValue(subjectRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setSubjects(Object.keys(data));
                } else {
                    setSubjects([]);
                }
            });
        }
    }, [selectedSemester]);
    const checksubject = (key) => {
        return key.replace(/[./#$\[\]]/g, '_');
    };
    const handlesessionalsChange = (subject, id, value) => {
        const checkedsub = checksubject(subject);
        setsessionals((prev) => ({
            ...prev,
            [id]: {
                ...(prev[id]),
                sessional: {
                    [selectedSemester]: {
                        ...(prev[id]?.sessional?.[selectedSemester]),
                        [selectedSubject]: {
                            ...(prev[id]?.sessional?.[selectedSemester]?.[selectedSubject]),
                            [checkedsub]: value,
                        }
                    }
                }
            }
        }));
    };

    useEffect(() => {
        const studentRef = ref(database, 'students');
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            for (const studentId of Object.keys(data)) {
                const studentRef = ref(database, `students/${studentId}`);

                const studentDataSnapshot = await get(studentRef);
                const studentData = studentDataSnapshot.val();

                if (studentData) {
                    const updatedStudentData = {
                        ...studentData,
                        sessional: {
                            ...(studentData?.sessional || {}),
                            [selectedSemester]: {
                                ...(studentData?.sessional?.[selectedSemester] || {}),
                                [selectedSubject]: sessionals[studentId]?.sessional?.[selectedSemester]?.[selectedSubject] || {},
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
            console.error("Error updating sessionals:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Header title="Update Student Sessionals" />
            <Box sx={{ p: 2 }}>
                {alertVisible && <Alert message="Form submitted successfully!" />}
                {loading && <Preloader />}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        justifyContent: 'start',
                        gap: 5,
                        mb: 3,
                    }}
                >
                    <FormControl fullWidth={isSmallScreen} sx={{ minWidth: 200 }}>
                        <InputLabel id="semester-label">Select Semester</InputLabel>
                        <Select
                            labelId="semester-label"
                            id="semester"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                            required
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {semesters.map((semester) => (
                                <MenuItem key={semester} value={semester}>
                                    {semester}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {subjects.length > 0 && (
                        <FormControl fullWidth={isSmallScreen} sx={{ minWidth: 200 }}>
                            <InputLabel id="subject-label">Select Subject</InputLabel>
                            <Select
                                labelId="subject-label"
                                id="subject"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                required
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {subjects.map((subject) => (
                                    <MenuItem key={subject} value={subject}>
                                        {subject}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Box>

                {selectedSubject && (
                    <Box component="form" onSubmit={handleSubmit}>
                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Roll No</TableCell>
                                        {Object.values(sessionalsubjects).map((sub, idx) => (
                                            <TableCell key={idx}>{sub.subject}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data ? (
                                        Object.keys(data).map((key, index) => (
                                            <TableRow key={key}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{data[key].Name}</TableCell>
                                                <TableCell>{data[key].rollNo}</TableCell>
                                                {Object.values(sessionalsubjects).map((sub, idx) => (
                                                    <TableCell key={idx}>
                                                        <TextField
                                                            type="number"
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth={isSmallScreen}
                                                            onChange={(e) =>
                                                                handlesessionalsChange(sub.subject, key, e.target.value)
                                                            }

                                                        />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                Loading data...
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Layout>
    );
}
