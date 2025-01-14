import '../styles/scss/component.scss';

function Nav() {
    return (
        <nav className="sidebar col-2">
            <ul className="sidebar-menu pt-3">

                <li className="sidebar-components">
                    <a href="/home" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                        Dashboard
                    </a>
                </li>

                <li className="sidebar-components dropdown">
                    <a
                        href="#!"
                        className="link-light link-underline-opacity-0 link-underline-opacity-100-hover dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        Edit Students
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/StudentForm">Add Students</a></li>
                        <li><a className="dropdown-item" href="#">Remove Students</a></li>
                        <li><a className="dropdown-item" href="#">Edit Students</a></li>
                    </ul>
                </li>


                <li className="sidebar-components dropdown">
                    <a
                        href="#!"
                        className="link-light link-underline-opacity-0 link-underline-opacity-100-hover dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        Update Marks
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/sessional">Sessional Marks</a></li>
                        <li><a className="dropdown-item" href="/Updatemarks">Final Exam Marks</a></li>
                    </ul>
                </li>

                <li className="sidebar-components dropdown">
                    <a
                        href="#!"
                        className="link-light link-underline-opacity-0 link-underline-opacity-100-hover dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        Update Attendance
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/addAttendence">Add / Update</a></li>
                        <li><button className="dropdown-item" type="button">Bulk Update</button></li>
                    </ul>
                </li>
                <li className="sidebar-components">
                    <a href="/check-attendence" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                        Check Attendance
                    </a>
                </li>

            </ul>
        </nav>
    );
}

export default Nav;
