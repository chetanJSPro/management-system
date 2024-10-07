import '../styles/dashboard.css';

function Nav() {
    return (
        <nav className="sidebar col-3">
            <ul className="sidebar-menu pt-3">
                <a href="/" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Dashboard</li></a>
                <a href="StudentForm" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student login form</li></a>
                <a href="readattendence" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Attendance</li></a>
                {/* <a href="student-details" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student Details</li></a> */}
                {/* <a href="StudentFees" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student Fees</li></a> */}
                <a href="marks" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student Marks</li></a>
                <a href="addAttendence" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Update Attendance</li> </a>
                <a href="check-attendence" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>check attendence</li> </a>
            </ul>
        </nav>
    );
}

export default Nav;
