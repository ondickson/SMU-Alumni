import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/login';
import SignUp from './Pages/SignUp';

import AdminDashboard from './Pages/AdminPage/AdminDashboard';
import AlumniInformation from './Pages/AdminPage/AlumniInformation';
import Events from './Pages/AdminPage/EventPage';
import JobPost from './Pages/AdminPage/JobPost';
import AccountSetting from './Pages/AdminPage/AccounSetting';

import AlumniDashboard from './Pages/AlumniPage/AlumniDashboard';
import Profile from './Pages/AlumniPage/Profile';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* ADMIN  */}
        <Route path="/AlumniInformation" element={<AlumniInformation />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/EventPage" element={<Events />} />
        <Route path="/JobPost" element={<JobPost />} />
        <Route path="/AccountSetting" element={<AccountSetting />} />

        {/* ALUMNI  */}
        <Route path="/AlumniDashboard" element={<AlumniDashboard />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
