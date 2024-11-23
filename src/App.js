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
import Welcome from './pages/welcome';
import Profile from './pages/profile';
import FireLogin from './pages/firelogin';
import Signup from './pages/signup';

function App() {

  return (

    <Router>

      <div>
        <Routes>
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/check-attendence" element={<Studentcheckatt />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nav" element={<Topnav />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/hh" element={<Login />} />
          <Route path="/login" element={<FireLogin />} />
          <Route path="/signup" element={<Signup />} />

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
