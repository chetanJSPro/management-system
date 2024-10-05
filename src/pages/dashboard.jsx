import '../styles/dashboard.css'

import * as React from 'react';

import { Box, Card, CardActions, CardContent, Grid, Link, Typography } from '@mui/material';

import Button from '@mui/material/Button';
import Nav from '../components/nav';

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
        <div class="dashboard-container">
            <Nav />
            <div class="main-content">
                <header class="topbar">
                    <h1>Dashboard</h1>
                    <div class="user-info">
                        <p>Welcome, User</p>
                        <a href="/">Logout</a>
                    </div>
                </header>
                <div class="content">
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
                        <tr class="table-headers">
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
                            <th class="mobile-header">Number</th><td>2489</td>
                            <th class="mobile-header">Market rate</th><td>€12.35</td>
                            <th class="mobile-header">Weight</th><td>5%</td>
                            <th class="mobile-header">Value</th><td>€1,536.96</td>
                        </tr>
                        <tr>
                            <td>House of Dedgeny EUR Flex</td>
                            <th class="mobile-header">Number</th><td>5478</td>
                            <th class="mobile-header">Market rate</th><td>€42.68	</td>
                            <th class="mobile-header">Weight</th><td>2%</td>
                            <th class="mobile-header">Value</th><td>€4,676.02</td>
                        </tr>
                        <tr>
                            <td>PlayCo Group Local</td>
                            <th class="mobile-header">Number</th><td>123</td>
                            <th class="mobile-header">Market rate</th><td>€147.36</td>
                            <th class="mobile-header">Weight</th><td>3%</td>
                            <th class="mobile-header">Value</th><td>€543.76</td>
                        </tr>
                        <tr>
                            <td>PlayCo Group Low</td>
                            <th class="mobile-header">Number</th><td>5477</td>
                            <th class="mobile-header">Market rate</th><td>€147.00</td>
                            <th class="mobile-header">Weight</th><td>10%</td>
                            <th class="mobile-header">Value</th><td>€80,511.90</td>
                        </tr>
                        <tr>
                            <td>House of Dedgeny High</td>
                            <th class="mobile-header">Number</th><td>5899</td>
                            <th class="mobile-header">Market rate</th><td>€ 288.00</td>
                            <th class="mobile-header">Weight</th><td>4%</td>
                            <th class="mobile-header">Value</th><td>€67,956.48</td>
                        </tr>
                        <tr>
                            <td>House of Dedgeny USD Med</td>
                            <th class="mobile-header">Number</th><td>11477</td>
                            <th class="mobile-header">Market rate</th><td>€18.00</td>
                            <th class="mobile-header">Weight</th><td>5%</td>
                            <th class="mobile-header">Value</th><td>€10,329.30</td>
                        </tr>
                        <tr>
                            <td>Sterck Inc. Med</td>
                            <th class="mobile-header">Number</th><td>1476</td>
                            <th class="mobile-header">Market rate</th><td>€187.00</td>
                            <th class="mobile-header">Weight</th><td>10%</td>
                            <th class="mobile-header">Value</th><td>€27,601.20</td>
                        </tr>
                        <tr>
                            <td>PlayCo Group Universal High</td>
                            <th class="mobile-header">Number</th><td>6547</td>
                            <th class="mobile-header">Market rate</th><td>€782.00</td>
                            <th class="mobile-header">Weight</th><td>12%</td>
                            <th class="mobile-header">Value</th><td>€614,370.48</td>
                        </tr>
                        <tr>
                            <td>PlayCo Group Universal Low</td>
                            <th class="mobile-header">Number</th><td>1476</td>
                            <th class="mobile-header">Market rate</th><td>€187.00</td>
                            <th class="mobile-header">Weight</th><td>10%</td>
                            <th class="mobile-header">Value</th><td>€27,601.20</td>
                        </tr>
                        <tr>
                            <td>PlayCo Group Universal High</td>
                            <th class="mobile-header">Number</th><td>1471</td>
                            <th class="mobile-header">Market rate</th><td>€148.00</td>
                            <th class="mobile-header">Weight</th><td>18%</td>
                            <th class="mobile-header">Value</th><td>€39,187.44</td>
                        </tr>
                        <tr>
                            <td>Sterck Inc. Low</td>
                            <th class="mobile-header">Number</th><td>1978</td>
                            <th class="mobile-header">Market rate</th><td>€68.23</td>
                            <th class="mobile-header">Weight</th><td>11%</td>
                            <th class="mobile-header">Value</th><td>€14,845.48</td>
                        </tr>
                        <tr>
                            <td>Sterck Inc. Universal High</td>
                            <th class="mobile-header">Number</th><td>6512</td>
                            <th class="mobile-header">Market rate</th><td>€642.02</td>
                            <th class="mobile-header">Weight</th><td>5%</td>
                            <th class="mobile-header">Value</th><td>€209,041.71</td>
                        </tr>
                        <tr>
                            <td>Sterck Inc. Flex</td>
                            <th class="mobile-header">Number</th><td>5423</td>
                            <th class="mobile-header">Market rate</th><td>€78.96</td>
                            <th class="mobile-header">Weight</th><td>7%</td>
                            <th class="mobile-header">Value</th><td>€29,974.01</td>
                        </tr>
                        <tr>
                            <td>PlayCo Group Universal Med</td>
                            <th class="mobile-header">Number</th><td>7812</td>
                            <th class="mobile-header">Market rate</th><td>€54.86</td>
                            <th class="mobile-header">Weight</th><td>8%</td>
                            <th class="mobile-header">Value</th><td>€34,285.31</td>
                        </tr>
                        <tr class='total'>
                            <th>Total</th>
                            <td class="total-val" colspan="4">€1,134,860.04</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

    );
}

export default Dashboard;
