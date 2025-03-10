import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function AlumniDashboard() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Alumni Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the alumni dashboard! Here you can manage your profile, connect with fellow alumni, and explore opportunities.
        </Typography>
      </Paper>
    </Container>
  );
}

export default AlumniDashboard;
