import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/login';
import AlumniInformation from './Pages/AlumniPage/AlumniInformation';
import AlumniDashboard from './Pages/AlumniPage/AlumniDashboard';
import StudentInformation from './Pages/AlumniPage/StudentInformation';
import SignUp from './Pages/SignUp';
import AdminDashboard from './Pages/AdminPage/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AlumniInformation" element={<AlumniInformation />} />
        <Route path="/StudentInformation" element={<StudentInformation />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AlumniDashboard" element={<AlumniDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;