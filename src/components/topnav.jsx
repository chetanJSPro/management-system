import React from 'react'
import logo from "../assets/images/logo.png"
export default function Topnav() {
    return (
        <nav className="navbar bg-white shadow-lg navbar-expand-lg ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} height={60} alt="" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                    <ul className="navbar-nav mb-2 d-flex navbar-right">
                        <li className="nav-item ">
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>

                        <li className="nav-item dropdown ">
                            <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Welcome user</a></li>
                                <li><a className="dropdown-item" href="/check-attendence">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Log out</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}
