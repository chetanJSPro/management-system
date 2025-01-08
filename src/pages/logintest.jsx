import React, { useEffect, useState } from 'react';
import "../styles/scss/login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { database } from '../firebaseconf';
import { onValue, ref } from 'firebase/database';

export default function Login() {
    const navigate = useNavigate();
    const [error, seterror] = useState();
    const [passVal, setpassVal] = useState();
    const [inpVal, setinpVal] = useState();
    const [formValues, setFormValues] = useState([]);

    const [userdata, setData] = useState();

    useEffect(() => {
        const dataRef = ref(database, 'students');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const fetchedData = snapshot.val();
            setData(fetchedData);
        });
        return () => unsubscribe();
    }, []);
    console.log(userdata);

    let greencol = "#65de44";
    let errormessage = document.getElementById("error");

    function HandleSubmit(e) {
        var formdata = new FormData(e.target);
        var formObject = Object.fromEntries(formdata.entries());
        let inpvalue = String(inpVal);
        let passvalue = String(passVal);
        let usercheck = userdata.find((user) => user.Name == inpvalue);
        if (usercheck) {
            if (usercheck.password === passvalue) {
                seterror("Logged in successfully redirecting to home page...");
                errormessage.style.color = greencol;
                navigate('/home')
            } else {
                seterror("Incorrect Password");
                errormessage.style.color = "red";
            }
        } else {
            seterror("username in not correct");
        }

        setFormValues(formObject);
        e.preventDefault();
        console.log(formValues);
    }

    function Handleinput(e) {
        const val = e.target.value;
        setinpVal(val);
    }

    function HandlePass(e) {
        const val = e.target.value;
        setpassVal(val);
    }

    // eye button
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <section className='login-section'>
            <div className='row no-gutters'>

                <div className="wrapper">
                    <div id="formContent">
                        <div className="d-flex justify-content-center align-items-center">
                            <h1 className='col-3 text-left'>Login</h1>
                            <FontAwesomeIcon className='col-1 text-left p-3' icon={faArrowRightToBracket} size='xl' />
                        </div>
                        <form onSubmit={e => HandleSubmit(e)} className='form'>
                            <p>login as</p>
                            <TextField
                                fullWidth
                                id="username "
                                name="username"
                                label="UserName"
                                className="form-control mb-2"
                                onChange={Handleinput}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <FormControl sx={{ width: '100%' }} fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    sx={{ borderRadius: '12px' }}
                                    onChange={HandlePass}
                                    id="userpwd"
                                    name="userpwd"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                    label="Password"
                                />
                            </FormControl>

                            <button className='mt-3 sub' type="submit">Log In</button>
                        </form>
                        <div id='error'>{error}</div>
                        <div id="formFooter">
                            <p className="underlineHover" href="">
                                Welcome to the Dashboard
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
