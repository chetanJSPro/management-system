import '../styles/scss/component.scss'

import * as React from 'react';

import { Box, Card, CardActions, CardContent, Grid, Link, Typography } from '@mui/material';
import Layout from '../components/layout';
import Button from '@mui/material/Button';

function Dashboard() {
    const card1 = (
        <React.Fragment className="cards">
            <CardContent>
                <Typography variant="h5" component="div">
                    Yearly Attendence
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    all of the attendence of this year
                </Typography>
                <Typography sx={{ fontSize: 35 }}>
                    200
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className="coloredButton" >Learn More</Button>
            </CardActions>
        </React.Fragment>
    );


    const card2 = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Monthly Attendence
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    all of the attendence of this month
                </Typography>
                <Typography sx={{ fontSize: 35 }}>
                    18
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className="coloredButton" >Learn More</Button>
            </CardActions>
        </React.Fragment>
    );

    const card3 = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Today Attendence
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Attendence of today
                </Typography>
                <Typography sx={{ fontSize: 35 }}>
                    attended
                </Typography>
            </CardContent>
            <CardActions>
                <Button className="coloredButton" >Learn More</Button>
            </CardActions>
        </React.Fragment>
    );


    return (
        <Layout>
            <div className="dashboard-container">
                <div className="main-content">
                    <header className="topbar">
                        <h1>Dashboard</h1>
                        <div className="user-info">
                            <p>Welcome, User</p>
                            <a href="/">Logout</a>
                        </div>
                    </header>
                    <div className="content">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={4}>
                                    <Box sx={{ minWidth: 275 }}>
                                        <Card variant="outlined" className='cards'>{card1}</Card>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box sx={{ minWidth: 275 }}>
                                        <Card variant="outlined" className='cards'>{card2}</Card>
                                    </Box>
                                </Grid>  <Grid item xs={4}>
                                    <Box sx={{ minWidth: 275 }}>
                                        <Card variant="outlined" className='cards'>{card3}</Card>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr className="table-headers">
                                <th>Name</th>
                                <th>Number</th>
                                <th>Market rate</th>
                                <th>Weight</th>

                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PlayCo Group Universal Flex</td>
                                <th className="mobile-header">Number</th><td>2489</td>
                                <th className="mobile-header">Market rate</th><td>€12.35</td>
                            </tr>
                            <tr>
                                <td>House of Dedgeny EUR Flex</td>
                                <th className="mobile-header">Number</th><td>5478</td>
                                <th className="mobile-header">Market rate</th><td>€42.68	</td>
                            </tr>
                            <tr>
                                <td>PlayCo Group Local</td>
                                <th className="mobile-header">Number</th><td>123</td>
                                <th className="mobile-header">Market rate</th><td>€147.36</td>
                            </tr>
                            <tr>
                                <td>PlayCo Group Low</td>
                                <th className="mobile-header">Number</th><td>5477</td>
                                <th className="mobile-header">Market rate</th><td>€147.00</td>
                            </tr>
                            <tr>
                                <td>House of Dedgeny High</td>
                                <th className="mobile-header">Number</th><td>5899</td>
                                <th className="mobile-header">Market rate</th><td>€ 288.00</td>
                            </tr>
                            <tr>
                                <td>House of Dedgeny USD Med</td>
                                <th className="mobile-header">Number</th><td>11477</td>
                                <th className="mobile-header">Market rate</th><td>€18.00</td>
                            </tr>
                            <tr>
                                <td>Sterck Inc. Med</td>
                                <th className="mobile-header">Number</th><td>1476</td>
                                <th className="mobile-header">Market rate</th><td>€187.00</td>
                            </tr>
                            <tr>
                                <td>PlayCo Group Universal High</td>
                                <th className="mobile-header">Number</th><td>6547</td>
                                <th className="mobile-header">Market rate</th><td>€782.00</td>
                            </tr>
                            <tr>
                                <td>PlayCo Group Universal Low</td>
                                <th className="mobile-header">Number</th><td>1476</td>
                                <th className="mobile-header">Market rate</th><td>€187.00</td>
                            </tr>
                            <tr>
                                <td>PlayCo Group Universal High</td>
                                <th className="mobile-header">Number</th><td>1471</td>
                                <th className="mobile-header">Market rate</th><td>€148.00</td>
                            </tr>
                            <tr>
                                <td>Sterck Inc. Low</td>
                                <th className="mobile-header">Number</th><td>1978</td>
                                <th className="mobile-header">Market rate</th><td>€68.23</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
