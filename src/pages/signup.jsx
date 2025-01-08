import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconf';
import "../styles/scss/login.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <main>
            <section className="login-section">
                <div className="row no-gutters">
                    <div className="wrapper">
                        <div id="formContent">
                            <div className="d-flex justify-content-center align-items-center">
                                <h1 className="col-6 text-left">Sign Up</h1>
                                <FontAwesomeIcon
                                    className="col-1 text-left p-3"
                                    icon={faArrowRightToBracket}
                                    size="xl"
                                />
                            </div>
                            <form className="form">
                                <div className="form-group">
                                    <label htmlFor="email-address"></label>

                                    <TextField
                                        fullWidth
                                        label="Email"
                                        className="form-control mb-2"
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: '12px',
                                            },
                                        }}
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <FormControl sx={{ width: '100%' }} fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            type={showPassword ? 'text' : 'password'}
                                            sx={{ borderRadius: '12px' }}
                                            id="password userpwd"
                                            name="password userpwd"
                                            // className="form-control mb-2"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

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

                                </div>

                                <button
                                    type="submit"
                                    className="mt-3 sub"
                                    onClick={onSubmit}
                                >
                                    Sign up
                                </button>
                            </form>
                            <div id="formFooter">
                                <p className="underlineHover">
                                    Already have an account?{' '}
                                    <NavLink to="/login" className="np">
                                        Sign in
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signup