
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./styles/app.scss"
import Dashboard from './pages/dashboard';
import StudentDetails from './pages/student-details';

import StudentForm from './pages/studentform';

import Readattendence from './pages/readattendence';
import AddAttendence from './pages/student-update-attendence.jsx';
import CalendarPage from './components/calendar';
import Login from './pages/login';
import Topnav from './components/topnav';
import Studentcheckatt from './pages/student-attendence';
import Welcome from './pages/welcome';
import Profile from './pages/userprofile';
import FireLogin from './pages/login';
import Signup from './pages/signup';
import Updatemarks from './pages/student-marks';
import Teacherdashboard from './pages/teacher-dashboard.jsx';
import Assignment from './pages/assignment.jsx';
import StudentCheckMarks from './pages/check-marks.jsx';
import Sessionals from './pages/sessionals.jsx';
import Test from './pages/tet.jsx';
function App() {
  return (

    <Router>

      <div>
        <Routes>
          <Route path="/updatemarks" element={<Updatemarks />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/teacher-dashboard" element={<Teacherdashboard />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/check-attendence" element={<Studentcheckatt />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nav" element={<Topnav />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<FireLogin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/sessional" element={<Sessionals />} />
          <Route path="/test" element={<Test />} />

          <Route path="/checkmarks" element={<StudentCheckMarks />} />

          <Route path="/readattendence" element={<Readattendence />}>
          </Route>
          <Route path="/addAttendence" element={<AddAttendence />}>
          </Route>
          <Route path="/home" element={<Dashboard />}>
          </Route>

          <Route path="/studentform" element={<StudentForm />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
