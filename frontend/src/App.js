import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/homepage';
import Login from './Pages/login';
import AlumniInformation from './Pages/AlumniPage/AlumniInformation';
import StudentInformation from './Pages/AlumniPage/StudentInformation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AlumniInformation" element={<AlumniInformation />} />
        <Route path="/StudentInformation" element={<StudentInformation />} />
      </Routes>
    </Router>
  );
}

export default App;