import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, Button, Card, CardContent, Grid, 
  TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Switch, IconButton, Dialog, DialogActions, 
  DialogContent, DialogTitle 
} from '@mui/material';
import { Edit, Delete, Settings } from '@mui/icons-material';
import Sidebar from '../Sidebar'; // Import Sidebar
import './AccountSetting.css'; // Import CSS for styling

function AccountSetting() {
  // State to manage user data
  const [users, setUsers] = useState([
    { name: 'John Doe', email: 'johndoe@example.com', active: true },
  ]);

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  // Function to toggle active status
  const handleToggleActive = (index) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, active: !user.active } : user
      )
    );
  };

  // Function to handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to add user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, active: true }]);
      setNewUser({ name: '', email: '', role: '' });
      handleClose();
    }
  };

  return (
    <Box display="flex" className="container">
      {/* Sidebar - Fixed Width */}
      <Box className="sidebar-container">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box component="main" className="main-container">
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
                    <br />
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <TextField fullWidth label="Name" variant="outlined" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField fullWidth label="Email" variant="outlined" />
                      </Grid>
                      <Grid item xs={3}>
                        <Select 
                          fullWidth 
                          variant="outlined"
                          displayEmpty
                          defaultValue=""
                        >
                          <MenuItem value="" disabled>Select Role</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Alumni">Alumni</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={1.5} display="flex" alignItems="stretch">
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          onClick={handleOpen}
                          sx={{ 
                            height: '53px', 
                            width: '100%', 
                            '&:hover': { 
                              backgroundColor: '#272974', 
                              color: '#fff', 
                              borderColor: '#272974' 
                            } 
                          }}
                        >
                          Create User
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* User List Table */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <h3>User List</h3>
                    <br />
                    <TableContainer component={Paper}>
                      <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: '150px' }}><b>Name</b></TableCell>
                          <TableCell sx={{ width: '250px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                            <b>Email</b>
                          </TableCell>
                          <TableCell align="center" sx={{ width: '100px' }}><b>Active</b></TableCell>
                          <TableCell align="center" sx={{ width: '150px' }}><b>Actions</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user, index) => (
                          <TableRow key={index}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                              {user.email}
                            </TableCell>
                            <TableCell align="center">
                              <Switch 
                                checked={user.active} 
                                onChange={() => handleToggleActive(index)} 
                                color="primary"
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#272974',
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box display="flex" justifyContent="center" gap={1}>
                                <IconButton sx={{ color: '#272974' }}>
                                  <Edit />
                                </IconButton>
                                <IconButton sx={{ color: 'grey' }}>
                                  <Settings />
                                </IconButton>
                                <IconButton color="error">
                                  <Delete />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Backup Section */}
              <Grid item xs={12} mt={3}>
                <Card>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h3>Backup</h3>
                    <br />
                    <p>The backup process is fully automated and runs daily at 10:00 AM.</p>
                    <br />
                    <Button variant="outlined" color="primary">Restore Backup Database</Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>

      {/* Add User Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            label="Name" 
            variant="outlined" 
            margin="dense" 
            value={newUser.name} 
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField 
            fullWidth 
            label="Email" 
            variant="outlined" 
            margin="dense" 
            value={newUser.email} 
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <Select 
            fullWidth 
            value={newUser.role || ""} 
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} 
            variant="outlined"
            displayEmpty
            margin="dense"
          >
            <MenuItem value="" disabled>Select Role</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Alumni">Alumni</MenuItem>
          </Select>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AccountSetting;
