import 'bootstrap/dist/css/bootstrap.css';
import '../styles/dashboard.css'

import * as React from 'react';

import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';

import Nav from './nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

function StudentForm() {
    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    const currencies = [
        {
            value: 'Nothing',
            label: '___',
        },
        {
            value: '8th pass',
            label: '8th pass',
        },
        {
            value: '10th pass',
            label: '10th pass',
        },

        {
            value: '12th pass',
            label: '12th pass',
        },
    ];

    const Branch = [
        {
            value: 'Nothing',
            label: '___',
        },
        {
            value: 'CSE',
            label: 'CSE',
        },
        {
            value: 'ECE',
            label: 'ECE',
        },
        {
            value: 'FD',
            label: 'FD',
        },
        {
            value: 'CE',
            label: 'CE',
        },
        {
            value: 'EE',
            label: 'EE',
        },
    ];
    return (
        <div className='dashboard-container'>
            <div className='row justify-content-center'>
                <h1 className='col-5 pt-5'>Students Login</h1>

                <div className='col-8'>

                    <Box sx={{ flexGrow: 1 }} my={8} p={1}>
                        <Grid container spacing={5}>
                            <Grid item xs={5}>
                                <TextField id="standard-basic" sx={{ width: 300 }} label="Name" variant="standard" />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField label="Roll no." sx={{ width: 300 }} variant="standard" />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField id="standard-password-input" sx={{ width: 300 }} label="Password" type="password" autoComplete="current-password" variant="standard" />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Branch" sx={{ width: 300 }}
                                    defaultValue="Nothing"
                                    helperText="Branch you are studying in"
                                    variant="standard"
                                >
                                    {Branch.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField></Grid>
                            <Grid container item xs={8} justifyContent="center">
                                <Button sx={{ width: 200 }} className='button' variant='contained' color="secondary">Submit</Button>
                            </Grid>

                        </Grid>
                    </Box>

                </div>
            </div>
        </div>

    )
}
export default StudentForm;
