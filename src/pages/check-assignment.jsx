import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    CircularProgress,
    Alert,
    Paper,
} from "@mui/material";
import { getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Layout from "../components/layout";
import Header from "../components/header";
import Preloader from '../components/preloader';

export default function CheckAssignment() {
    const [assignments, setAssignments] = useState({});
    const [formVisible, setFormVisible] = useState({});
    const [newAssignment, setNewAssignment] = useState({});
    const [marks, setMarks] = useState(0);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [rollno, setRollno] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        const db = getDatabase();
        const studentRef = ref(db, "assignments");
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setAssignments(data || {});
        });
    }, []);

    const toggleFormVisibility = (key) => {
        setFormVisible((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSubmitchange = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const database = getDatabase();
            const assignmentsRef = ref(database, `assignments/${newAssignment}/submissions/${rollno}`);
            const assignmentWithDate = {
                marksAwarded: marks,
                remarks: remarks,
                checked: true,
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
            <Header title="Check Assignment" />
            {alertVisible && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Assignment submitted successfully!
                </Alert>
            )}
            {loading && <Preloader />}
            <Typography
                variant="h5"
                sx={{ textTransform: "uppercase", mt: 4, textAlign: "center" }}
            >
                All Assignments:
            </Typography>
            {Object.keys(assignments).length > 0 ? (
                Object.entries(assignments).map(([key, assignment], index) => (
                    <Accordion key={key} sx={{ mt: 2, boxShadow: 4 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${index}-content`}
                            id={`panel-${index}-header`}
                        >
                            <Typography>
                                {index + 1}. {assignment.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{assignment.description}</Typography>
                            <Button
                                onClick={() => {
                                    toggleFormVisibility(key);
                                    setNewAssignment(key);
                                }}
                                variant="outlined"
                                sx={{ mt: 2 }}
                            >
                                {formVisible[key] ? "Hide Submissions" : "Check Submissions"}
                            </Button>
                            {formVisible[key] && (
                                <form onSubmit={handleSubmitchange}>
                                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Roll No</TableCell>
                                                    <TableCell>Submission Date</TableCell>
                                                    <TableCell>PDF URL</TableCell>
                                                    <TableCell>Marks Obtained</TableCell>
                                                    <TableCell>Remarks</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {assignment.submissions &&
                                                    Object.entries(assignment.submissions).map(
                                                        ([rollNo, submission]) => (
                                                            <TableRow key={rollNo}>
                                                                <TableCell>{rollNo}</TableCell>
                                                                <TableCell>{submission.submittedDate}</TableCell>
                                                                <TableCell>
                                                                    <a
                                                                        href={submission.pdfUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        View PDF
                                                                    </a>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        type="number"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        placeholder="Marks"
                                                                        onChange={(e) => {
                                                                            setMarks(e.target.value);
                                                                            setRollno(rollNo);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        type="text"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        placeholder="Remarks"
                                                                        onChange={(e) =>
                                                                            setRemarks(e.target.value)
                                                                        }

                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </form>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography sx={{ mt: 4, textAlign: "center" }}>
                    Loading data...
                </Typography>
            )}
        </Layout>
    );
}
