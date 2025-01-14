
import * as React from 'react';

import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseconf';
import Header from '../components/header';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [data, setData] = React.useState({});
    const cards = [
        {
            id: 1,
            title: 'Add Attendance',
            description: 'Update Students Attendance.',
            slug: '/addAttendence',
        },
        {
            id: 2,
            title: 'Sessional Marks',
            description: 'Update Sessionals Marks.',
            slug: '/sessional',
        },
        {
            id: 3,
            title: 'Add Students',
            description: 'Add New Students details.',
            slug: '/StudentForm',
        },
    ];
    const [selectedCard, setSelectedCard] = React.useState(0);

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
            <Box className="dashboard-container" sx={{ p: 4 }}>
                <Grid
                    container
                    spacing={5}
                    justifyContent="center"
                    // alignItems="center"
                    className='quickaction shadow justify-content-center'
                >

                    {cards.map((card, index) => (
                        <Grid className='pb-4' item key={index} xs={11} sm={6} md={4} lg={3}>
                            <Card className='shadow rounded-4 mb-3' sx={{ height: '150px' }}>
                                <Link to={card.slug} style={{ textDecoration: 'none' }}>
                                    <CardActionArea
                                        onClick={() => setSelectedCard(index)}
                                        data-active={selectedCard === index ? '' : undefined}
                                        sx={{
                                            height: '100%',
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h5" component="div" align="center">
                                                {card.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" align="center">
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <table className="table mt-5">
                    <thead>
                        <tr className="table-headers">
                            <th>#</th>
                            <th>Name</th>
                            <th>Roll no.</th>
                            <th>Branch</th>
                            <th>Email</th>
                            <th>Phone no.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            Object.keys(data).map((key, index) => (
                                <tr key={key}>
                                    <td>{index + 1}</td>
                                    <td>{data[key].Name}</td>
                                    <td>{data[key].rollNo}</td>
                                    <td>{data[key].Branch}</td>
                                    <td>{data[key].email}</td>
                                    <td>{data[key].phoneNo}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Loading data...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Box>
        </Layout>
    );
}

export default Dashboard;
