import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Pages/login';
import SignUp from './Pages/SignUp';

import AdminDashboard from './Pages/AdminPage/AdminDashboard';
import AlumniInformation from './Pages/AdminPage/AlumniInformation';
import Events from './Pages/AdminPage/EventPage';
import JobPost from './Pages/AdminPage/JobPost';
import Messages from './Pages/AdminPage/Messages';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/AlumniInformation" element={<AlumniInformation />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/JobPost" element={<JobPost />} />
        <Route path="/Messages" element={<Messages />} />




      </Routes>
    </Router>
  );
}

export default App;