import React, { useEffect, useState } from 'react';
import "../styles/login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const [error, seterror] = useState();
    const [passVal, setpassVal] = useState();
    const [inpVal, setinpVal] = useState();
    const [radio, setradio] = useState('');
    const [formValues, setFormValues] = useState([]);

    const teachers = [
        {
            "username": "Ram lal",
            "password": "raml@123"
        },
        {
            "username": "chetan sharma",
            "password": "chetanpro"
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
    const students = [
        {
            "username": "chetan sharma",
            "password": "chetanpro"
        },
        {
            "username": "Rajkumar",
            "password": "12",
        },
        {
            "username": "dayanand",
            "password": "28",
        },
        {
            "username": "aakash",
            "password": "92",
        },

        {
            "username": "Ram Lal",
            "password": "22",
        },
        {
            "username": "prakashlal",
            "password": "255",
        }, {
            "username": "test",
            "password": "32",
        }
    ];


    let greencol = "#65de44";
    let errormessage = document.getElementById("error");

    function handleLoginType(e) {
        const buttonValue = e.target.value;
        setradio(buttonValue);
        console.log(buttonValue);
    }
    useEffect(() => {
        localStorage.setItem("formValues", JSON.stringify(formValues));
    }, [formValues]);

    function HandleSubmit(e) {
        var data = new FormData(e.target);
        var formObject = Object.fromEntries(data.entries());
        console.log(formObject);
        let inpvalue = String(inpVal);
        let passvalue = String(passVal);
        let usercheck = radio === "student" ? students.find((user) => user.username === inpvalue) : teachers.find((user) => user.username === inpvalue);

        if (usercheck) {
            if (usercheck.password === passvalue) {
                seterror("Logged in successfully redirecting to home page...");
                errormessage.style.color = greencol;
                navigate('/home')
            }
            else {
                seterror("Incorrect Password");
                errormessage.style.color = "red";
            }
        }
        else {
            seterror("username in not correct");
            errormessage.style.color = "red";
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
                            <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button-group">
                                <input type="radio" className="btn-check" name="logintype" id="btnradio1" value={'student'} onChange={e => handleLoginType(e)} autoComplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">Student</label>

                                <input type="radio" className="btn-check" name="logintype" id="btnradio3" value={'teacher'} onChange={e => handleLoginType(e)} autoComplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btnradio3">Teacher</label>
                            </div>
                            <input
                                className='form-control mb-2'
                                onChange={Handleinput}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                            />
                            <input
                                className='form-control'
                                onChange={HandlePass}
                                type="password"
                                id="userpwd"
                                name="userpwd"
                                placeholder="password"
                            />

                            <button className='sub' type="submit">Log In</button>
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
