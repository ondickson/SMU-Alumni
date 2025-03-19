import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, Button, Card, CardContent, Grid, 
  TextField, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Switch, IconButton, Dialog, DialogActions, 
  DialogContent, DialogTitle, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { Edit, Delete, Settings, Save } from '@mui/icons-material';
import Sidebar from '../Sidebar'; // Import Sidebar
import './AccountSetting.css'; // Import CSS for styling

function AccountSetting() {
  // State to manage user data
  const [users, setUsers] = useState([
    { 
      name: 'John Doe', 
      email: 'johndoe@example.com', 
      active: true,
      idNumber: 'EMP001',
      position: 'Manager'
    },
  ]);

  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    idNumber: '',
    position: ''
  });

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

  // Function to handle details modal
  const handleDetailsOpen = (user, index) => {
    setSelectedUser(user);
    setSelectedUserIndex(index);
    setEditedUser({...user});
    setEditMode(false);
    setDetailsOpen(true);
  };
  
  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setEditMode(false);
  };

  // Function to toggle edit mode
  const handleToggleEdit = () => {
    setEditMode(!editMode);
  };

  // Function to save edited user
  const handleSaveEdit = () => {
    if (editedUser.name && editedUser.email && editedUser.idNumber && editedUser.position) {
      setUsers(prevUsers => 
        prevUsers.map((user, index) => 
          index === selectedUserIndex ? editedUser : user
        )
      );
      setSelectedUser(editedUser);
      setEditMode(false);
    }
  };

  // Function to handle edit field changes
  const handleEditChange = (field, value) => {
    setEditedUser({...editedUser, [field]: value});
  };

  // Function to add user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.idNumber && newUser.position) {
      setUsers([...users, { ...newUser, active: true }]);
      setNewUser({ name: '', email: '', idNumber: '', position: '' });
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
                      <Grid item xs={4}>
                        <TextField fullWidth label="Name" variant="outlined" />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField fullWidth label="Email" variant="outlined" />
                      </Grid>
                      <Grid item xs={2} display="flex" alignItems="stretch">
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
                                <IconButton 
                                  sx={{ color: 'grey' }}
                                  onClick={() => handleDetailsOpen(user, index)}
                                >
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
          <TextField 
            fullWidth 
            label="ID Number" 
            variant="outlined" 
            margin="dense" 
            value={newUser.idNumber} 
            onChange={(e) => setNewUser({ ...newUser, idNumber: e.target.value })}
          />
          <TextField 
            fullWidth 
            label="Position" 
            variant="outlined" 
            margin="dense" 
            value={newUser.position} 
            onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* User Details Modal */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleDetailsClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#f5f5f5' }}>
          User Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <List>
              <ListItem>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Name"
                    value={editedUser.name}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText 
                    primary="Name" 
                    secondary={selectedUser.name} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
              <Divider />
              <ListItem>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Email"
                    value={editedUser.email}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText 
                    primary="Email" 
                    secondary={selectedUser.email} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
              <Divider />
              <ListItem>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="ID Number"
                    value={editedUser.idNumber}
                    onChange={(e) => handleEditChange('idNumber', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText 
                    primary="ID Number" 
                    secondary={selectedUser.idNumber} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
              <Divider />
              <ListItem>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Position"
                    value={editedUser.position}
                    onChange={(e) => handleEditChange('position', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText 
                    primary="Position" 
                    secondary={selectedUser.position} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Status" 
                  secondary={selectedUser.active ? "Active" : "Inactive"} 
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                {editMode && (
                  <Switch
                    checked={editedUser.active}
                    onChange={(e) => handleEditChange('active', e.target.checked)}
                    color="primary"
                  />
                )}
              </ListItem>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={editMode ? <Save /> : <Edit />}
            onClick={editMode ? handleSaveEdit : handleToggleEdit}
            sx={{ mr: 1 }}
          >
            {editMode ? 'Save' : 'Edit'}
          </Button>
          <Button onClick={handleDetailsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AccountSetting;