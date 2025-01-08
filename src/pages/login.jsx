// src/components/Login.js
// import React, { useState } from 'react';
// import { auth } from '../firebaseconf'; // Adjust the import path as needed
// import { signInWithEmailAndPassword } from "firebase/auth";
// import '../styles/login.scss'; // Import your CSS if you have
// import { useNavigate } from 'react-router-dom';

// const FireLogin = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             console.log('Logged in successfully');
//             navigate('/home')
//             // Redirect or do something on successful login
//         } catch (err) {
//             setError(err.message); // Display error message
//             console.error("Login error: ", err);
//         }
//     };

//     return (
//         <div className="login-container">
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Log In</button>
//             </form>
//             {error && <p className="error">{error}</p>}
//         </div>
//     );
// };

// export default FireLogin;
import "../styles/scss/login.scss"
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconf';
import { NavLink, useNavigate } from 'react-router-dom'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
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
        <>
            <section className='login-section'>
                <div className='row no-gutters'>

                    <div className="wrapper">
                        <div id="formContent">
                            <div className="d-flex justify-content-center align-items-center">
                                <h1 className='col-3 text-left'>Login</h1>
                                <FontAwesomeIcon className='col-1 text-left p-3' icon={faArrowRightToBracket} size='xl' />
                            </div>
                            <form className='form'>

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
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FormControl sx={{ width: '100%' }} fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        type={showPassword ? 'text' : 'password'}
                                        sx={{ borderRadius: '12px' }}
                                        id="password userpwd"
                                        name="password userpwd"
                                        required
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

                                <button className='mt-3 sub' type="submit" onClick={onLogin}>Log In</button>
                            </form>
                            <div id="formFooter">
                                <p className="underlineHover" href="">
                                    No account yet? {' '}
                                    <NavLink to="/signup" className="np">
                                        Sign up
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

export default Login