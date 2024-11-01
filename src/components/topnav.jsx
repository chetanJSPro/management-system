import React from 'react'

export default function Topnav() {
    return (
        <nav className="navbar shadow-lg navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
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
                <a className="navbar-brand col-md-8" href="#">
                    Lalbahadur shastri institute of sanskrit
                </a>
                <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                    <ul className="navbar-nav mb-2 ">
                        <li className="nav-item col-3 pe-3">
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item col-5 pe-3">
                            <a className="nav-link active" href="#">
                                Add attendance
                            </a>
                        </li>
                        <li className="nav-item dropdown col-3">
                            <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Other options
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Add students</a></li>
                                <li><a className="dropdown-item" href="/check-attendence">check attendence</a></li>
                                <li><a className="dropdown-item" href="#">marks</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    )
}
