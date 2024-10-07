import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Attendance from './components/attendance';
import Dashboard from './pages/dashboard';
import StudentDetails from './pages/student-details';
import StudentFees from './components/studentfees';
import StudentForm from './components/studentform';
import StudentMarks from './components/marks';
import Readattendence from './pages/readattendence';
import AddAttendence from './pages/addAttendence';
import CalendarPage from './components/calendar';
import Login from './pages/login';
import Topnav from './components/topnav';
import Studentcheckatt from './pages/studentcheckatt';

function App() {

  return (

    <Router>

      <div>
        <Routes>
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/check-attendence" element={<Studentcheckatt />} />
          <Route path="/nav" element={<Topnav />} />
          <Route path="/" element={<Login />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/studentfees" element={<StudentFees />}>
          </Route>
          <Route path="/attendance" element={<Attendance />}>
          </Route>
          <Route path="/readattendence" element={<Readattendence />}>
          </Route>
          <Route path="/addAttendence" element={<AddAttendence />}>
          </Route>
          <Route path="/home" element={<Dashboard />}>
          </Route>
          <Route path="/marks" element={<StudentMarks />} />
          <Route path="/studentform" element={<StudentForm />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
