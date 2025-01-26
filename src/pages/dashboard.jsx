import * as React from 'react';
import Layout from '../components/layout';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseconf';
import Header from '../components/header';
import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [data, setData] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState(0);

    const cards = [
        { id: 1, title: 'Add Attendance', description: 'Update Students Attendance.', slug: '/addAttendence' },
        { id: 2, title: 'Sessional Marks', description: 'Update Sessionals Marks.', slug: '/sessional' },
        { id: 3, title: 'Add Students', description: 'Add New Students details.', slug: '/StudentForm' },
    ];

    React.useEffect(() => {
        const studentRef = ref(database, 'students');
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, []);

    return (
        <Layout>
            <Header title="Dashboard" />
            <Box sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h4" gutterBottom>
                    Quick Actions:
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {cards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: '150px',
                                    boxShadow: selectedCard === index ? 6 : 3,
                                    borderRadius: 2,
                                }}
                            >
                                <Link to={card.slug} style={{ textDecoration: 'none' }}>
                                    <CardActionArea
                                        onClick={() => setSelectedCard(index)}
                                        sx={{ height: '100%' }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" align="center" gutterBottom>
                                                {card.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                align="center"
                                            >
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 5 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Roll No.</TableCell>
                                    <TableCell>Branch</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone No.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data ? (
                                    Object.keys(data).map((key, index) => (
                                        <TableRow key={key}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{data[key].Name}</TableCell>
                                            <TableCell>{data[key].rollNo}</TableCell>
                                            <TableCell>{data[key].Branch}</TableCell>
                                            <TableCell>{data[key].email}</TableCell>
                                            <TableCell>{data[key].phoneNo}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Loading data...
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Layout>
    );
}

export default Dashboard;
