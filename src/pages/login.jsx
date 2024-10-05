import React, { useState } from 'react';
import "../styles/login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const [error, seterror] = useState();
    const [passVal, setpassVal] = useState();
    const [inpVal, setinpVal] = useState();
    const Users = [
        {
            "username": "Ram lal",
            "password": "raml@123"
        },
        {
            "username": "Prem chand",
            "password": "prem@123"
        },
        {
            "username": "kishor lal",
            "password": "kish@123"
        }
    ];
    let greencol = "#65de44";
    let errormessage = document.getElementById("error");
    function HandleSubmit(e) {
        let inpvalue = String(inpVal);
        let passvalue = String(passVal);
        const usercheck = Users.find((user) => user.username === inpvalue);

        if (usercheck) {
            if (usercheck.password === passvalue) {
                seterror("Logged in successfully redirecting to home page...");
                errormessage.style.color = greencol;
                navigate('/home')
            }
            else {
                seterror("Incorrect Password");
                errormessage.style.color = "red";
                e.target.reset();
            }
        } else {
            seterror("please fill the fields");
            errormessage.style.color = "red";
            e.target.reset();
        }
        e.preventDefault();
    }
    function Handleinput(e) {
        const val = e.target.value;
        setinpVal(val);
    }
    function HandlePass(e) {
        const val = e.target.value;
        setpassVal(val);
    }

    return (
        <section className='login-section'>
            <div className='row no-gutters'>

                <div className="wrapper">
                    <div id="formContent">
                        <div className="d-flex justify-content-center align-items-center">
                            <h1 className='col-3 text-left'>Login</h1>
                            <FontAwesomeIcon className='col-1 text-left p-3' icon={faArrowRightToBracket} size='xl' />
                        </div>
                        <form onSubmit={HandleSubmit} className='form'>
                            <input
                                onChange={Handleinput}
                                type="text"
                                id="login"
                                name="login"
                                placeholder="Username"
                            />
                            <input
                                onChange={HandlePass}
                                type="text"
                                id="password"
                                name="password"
                                placeholder="password"
                            />
                            <input className='sub' type="submit" value="Log In" />
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
        </section>
    );
}
