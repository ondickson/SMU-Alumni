import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/login';
import SignUp from './Pages/SignUp';
import AlumniFeedback from './Pages/AlumniPage/AlumniFeedback';
import FeedbackResponse from './Pages/AdminPage/feedBack';

import AdminDashboard from './Pages/AdminPage/AdminDashboard';
import AlumniInformation from './Pages/AdminPage/AlumniInformation';
import EventPage from './Pages/AdminPage/EventPage';
import JobPost from './Pages/AdminPage/JobPost';
import AccountSetting from './Pages/AdminPage/AccountSetting';

import AlumniDashboard from './Pages/AlumniPage/AlumniDashboard';
import Profile from './Pages/AlumniPage/Profile';
import Jobs from './Pages/AlumniPage/Jobs';
import Events from './Pages/AlumniPage/Events';

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
        <Route path="/EventPage" element={<EventPage />} />
        <Route path="/JobPost" element={<JobPost />} />
        <Route path="/AccountSetting" element={<AccountSetting />} />
        <Route path="/feedBack" element={<FeedbackResponse />} />

        {/* ALUMNI  */}
        <Route path="/AlumniDashboard" element={<AlumniDashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AlumniFeedback" element={<AlumniFeedback />} />
        <Route path="/Jobs" element={<Jobs />} />
        <Route path="/Events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
