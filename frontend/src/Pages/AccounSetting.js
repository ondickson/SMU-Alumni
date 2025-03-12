import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Card, CardContent, Grid, TextField, Select, MenuItem } from '@mui/material';
import Sidebar from './Sidebar'; // Import Sidebar
import './AccountSetting.css'; // Import CSS for styling

function AccountSetting() {
  return (
    <Box display="flex" className="container">
      {/* Sidebar - Fixed Width */}
      <Box className="sidebar-container">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box component="main" className="main-container">
        {/* AppBar for Title */}
        <div className="content-wrapper">
          <AppBar position="static" className="appbar">
            <Toolbar>
              <Typography variant="h6" className="title">Account Settings</Typography>
            </Toolbar>
          </AppBar>

          <Box p={3}>
            <Grid container spacing={2}>
              {/* Manage Users Section */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <h3>Manage Users</h3>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={3}>
                        <TextField fullWidth label="Name" variant="outlined" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField fullWidth label="Email" variant="outlined" />
                      </Grid>
                      <Grid item xs={3}>
                        <Select fullWidth defaultValue="" variant="outlined">
                          <MenuItem value="">Select Role</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Department Head">Department Head</MenuItem>
                          <MenuItem value="Root">Root</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">Create User</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Backup Section */}
              <Grid item xs={12} mt={3}>
                <Card>
                  <CardContent>
                    <h3>Backup</h3>
                    <p>The backup process is fully automated and runs daily at 10:00 AM.</p>
                    <Button variant="contained" color="secondary">Restore Backup Database</Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default AccountSetting;