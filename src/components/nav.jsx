import '../styles/scss/component.scss';

function Nav() {
    return (
        <nav className="sidebar col-2">
            <ul className="sidebar-menu pt-3">
                <a href="/home" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Dashboard</li></a>
                <a href="StudentForm" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Add Student</li></a>
                {/* <a href="readattendence" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Check Attendance</li></a> */}
                {/* <a href="student-details" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student Details</li></a> */}
                {/* <a href="StudentFees" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student Fees</li></a> */}
                <a href="marks" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Student Marks</li></a>
                <a href="addAttendence" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Update Attendance</li> </a>
                <a href="check-attendence" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Check attendence</li> </a>
                <a href="Updatemarks" className='link-light link-underline-opacity-0 link-underline-opacity-100-hover'><li className='sidebar-components'>Update marks</li> </a>
            </ul>
        </nav>
    );
}

export default Nav;
