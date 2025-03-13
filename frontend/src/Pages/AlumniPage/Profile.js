import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, Button, Card, CardContent, Grid, 
  TextField, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import Sidebar from "../Sidebar";
import './Profile.css'; // Import CSS for styling

function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '',
    confirmPassword: '',
    avatar: '',
  });

  const [open, setOpen] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Function to handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to save changes
  const handleSave = () => {
    if (profile.password !== profile.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Profile updated successfully!');
    setOpen(false);
  };

  return (
    <Box display="flex" className="container">
      {/* Sidebar */}
      <Box className="sidebar-container">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box component="main" className="main-container">
        <div className="content-wrapper">
          <AppBar position="static" className="appbar">
            <Toolbar>
              <Typography variant="h6" className="title">Profile Settings</Typography>
            </Toolbar>
          </AppBar>

          <Box p={3}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Avatar src={profile.avatar} sx={{ width: 100, height: 100 }} />
                      <IconButton component="label">
                        <Edit />
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                      </IconButton>
                    </Box>
                    <br />
                    <TextField fullWidth label="Name" name="name" value={profile.name} onChange={handleChange} variant="outlined" margin="dense" />
                    <TextField fullWidth label="Email" name="email" value={profile.email} onChange={handleChange} variant="outlined" margin="dense" />
                    <TextField fullWidth type="password" label="New Password" name="password" value={profile.password} onChange={handleChange} variant="outlined" margin="dense" />
                    <TextField fullWidth type="password" label="Confirm Password" name="confirmPassword" value={profile.confirmPassword} onChange={handleChange} variant="outlined" margin="dense" />
                    <br />
                    <Button variant="contained" color="primary" fullWidth onClick={() => setOpen(true)}>
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update your profile?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;