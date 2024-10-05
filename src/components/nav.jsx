import '../styles/dashboard.css'

function Nav() {

    return (
        <nav className="sidebar col-3">
            <div className="sidebar-header">
                <h2>Menu</h2>
            </div>
            <ul className="sidebar-menu">
                <li className='sidebar-components'><a href="/">Dashboard</a></li>
                <li className='sidebar-components'><a href="StudentForm ">Student login form</a></li>
                <li className='sidebar-components'><a href="readattendence">Attendance</a></li>
                {/* <li className='sidebar-components'><a href="student-details">StudentDetails</a></li> */}
                {/* <li className='sidebar-components'><a href="StudentFees">student fees</a></li> */}
                {/* <li className='sidebar-components'><a href="marks">StudentMarks</a></li> */}
                <li className='sidebar-components'><a href="addAttendence">Update attendence</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
