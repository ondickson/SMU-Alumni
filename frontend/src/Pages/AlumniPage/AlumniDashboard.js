import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, Grid, Card, CardContent, Box } from '@mui/material';
import SidebarMenu from "../Sidebar";
import "./AlumniDashboard.css";
function AlumniDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SidebarMenu />
      
      {/* Header Section */}
      <Paper 
        elevation={4} 
        sx={{
          p: 4,
          textAlign: 'center',
          background: 'rgba(30, 30, 47, 0.8)',
          color: '#ffffff',
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          🎓 Alumni Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ opacity: 0.9 }}>
          Welcome to the alumni dashboard! Connect with fellow alumni, explore opportunities, and manage your profile.
        </Typography>
        <Button 
          variant="contained" 
          sx={{
            mt: 2,
            backgroundColor: '#ff3366',
            '&:hover': { backgroundColor: '#cc2952' },
            fontWeight: 'bold',
            textTransform: 'none'
          }} 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>

      {/* QR Code Section */}
      <Grid container spacing={3} sx={{ mt: 4, maxWidth: '900px' }}>
        {[1, 2, 3].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              elevation={5} 
              sx={{
                p: 3,
                textAlign: 'center',
                background: 'rgba(42, 42, 58, 0.9)',
                color: '#ffffff',
                borderRadius: 3,
                backdropFilter: 'blur(12px)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' },
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', opacity: 0.9 }}>
                  QR Code {index}
                </Typography>
                <Box 
                  sx={{
                    width: '100%',
                    height: 160,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Typography variant="body2" color="black">QR Code {index} Here</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AlumniDashboard;
