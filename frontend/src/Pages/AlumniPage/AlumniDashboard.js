import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import SidebarMenu from "../Sidebar";

function AlumniDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <Container maxWidth="md">
      <SidebarMenu />
      <Paper elevation={3} sx={{ p: 3, mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Alumni Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to the alumni dashboard! Here you can manage your profile, connect with fellow alumni, and explore opportunities.
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2, backgroundColor: '#272974'}} 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

export default AlumniDashboard;
