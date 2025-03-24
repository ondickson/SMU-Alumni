import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Edit, Delete, Settings, Save } from '@mui/icons-material';
import Sidebar from '../Sidebar'; 
import './AccountSetting.css';

function AccountSetting() {


  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    idNumber: '',
    position: '',
  });
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);



  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admins');
      setAdmins(response.data);
      setFilteredAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleToggleActive = async (id, active) => {
    try {
      await axios.put(`http://localhost:5001/api/admins/${id}`, {
        active: !active,
      });
      fetchAdmins();
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  // Function to handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleDetailsOpen = (admin) => {
    setSelectedAdmin(admin);
    setEditedAdmin({ ...admin });
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

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/admins/${editedAdmin._id}`,
        editedAdmin,
      );
      fetchAdmins();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditedAdmin({ ...editedAdmin, [field]: value });
  };

  const handleAddAdmin = async () => {
    if (newAdmin.name && newAdmin.email && newAdmin.password && newAdmin.idNumber && newAdmin.position) {
      try {
        await axios.post('http://localhost:5001/api/admins', {
          name: newAdmin.name,
          email: newAdmin.email,
          password: newAdmin.password,
          idNumber: newAdmin.idNumber,
          position: newAdmin.position,
        });
        fetchAdmins();
        setNewAdmin({
          name: '',
          email: '',
          password: '',
          idNumber: '',
          position: '',
        });
        handleClose();
      } catch (error) {
        console.error('Error adding admin:', error);
      }
    }
  };

  
  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/admins/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterName(value);
    setFilteredAdmins(
      admins.filter((admin) => admin.name.toLowerCase().includes(value)),
    );
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
              <Typography variant="h6" className="title">
                Account Settings
              </Typography>
            </Toolbar>
          </AppBar>

          <Box p={3}>
            <Grid container spacing={2}>
              {/* Manage Users Section */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <h3>Manage Admins</h3>
                    <br />
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          label="Filter by Name"
                          variant="outlined"
                          value={filterName}
                          onChange={handleFilterChange}
                        />
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
                              borderColor: '#272974',
                            },
                          }}
                        >
                          Add Admin
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
                    <h3>Admin List</h3>
                    <br />
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ width: '150px' }}>
                              <b>Name</b>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: '250px',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                              }}
                            >
                              <b>Email</b>
                            </TableCell>
                            <TableCell align="center" sx={{ width: '100px' }}>
                              <b>Active</b>
                            </TableCell>
                            <TableCell align="center" sx={{ width: '150px' }}>
                              <b>Actions</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredAdmins.map((admin) => (
                            <TableRow key={admin._id}>
                              <TableCell>{admin.name}</TableCell>
                              <TableCell
                                sx={{
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                }}
                              >
                                {admin.email}
                              </TableCell>
                              <TableCell align="center">
                                <Switch
                                  checked={admin.active}
                                  onChange={() =>
                                    handleToggleActive(admin._id, admin.active)
                                  }
                                  color="primary"
                                  sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                                      {
                                        backgroundColor: '#272974',
                                      },
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  gap={1}
                                >

                                  <IconButton
                                    sx={{ color: 'grey' }}
                                    onClick={() => handleDetailsOpen(admin)}
                                  >
                                    <Settings />
                                  </IconButton>
                                  <IconButton color="error" onClick={() => handleDeleteAdmin(admin._id)}>
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
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <h3>Backup</h3>
                    <br />
                    <p>
                      The backup process is fully automated and runs daily at
                      10:00 AM.
                    </p>
                    <br />
                    <Button variant="outlined" color="primary">
                      Restore Backup Database
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>

      {/* Add User Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" variant="outlined" margin="dense" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}/>
          <TextField fullWidth label="Email" variant="outlined" margin="dense" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}/>
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}/>
          <TextField fullWidth label="ID Number" variant="outlined" margin="dense" value={newAdmin.idNumber} onChange={(e) => setNewAdmin({ ...newAdmin, idNumber: e.target.value })}/>
          <TextField fullWidth label="Position" variant="outlined" margin="dense" value={newAdmin.position} onChange={(e) => setNewAdmin({ ...newAdmin, position: e.target.value })}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAdmin} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Details Modal */}
      <Dialog
        open={detailsOpen}
        onClose={handleDetailsClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#f5f5f5' }}>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedAdmin && (
            <List>
              <ListItem>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Name"
                    value={editedAdmin.name}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText
                    primary="Name"
                    secondary={selectedAdmin.name}
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
                    value={editedAdmin.email}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText
                    primary="Email"
                    secondary={selectedAdmin.email}
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
                    value={editedAdmin.idNumber}
                    onChange={(e) =>
                      handleEditChange('idNumber', e.target.value)
                    }
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText
                    primary="ID Number"
                    secondary={selectedAdmin.idNumber}
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
                    value={editedAdmin.position}
                    onChange={(e) =>
                      handleEditChange('position', e.target.value)
                    }
                    variant="outlined"
                    margin="dense"
                  />
                ) : (
                  <ListItemText
                    primary="Position"
                    secondary={selectedAdmin.position}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={selectedAdmin.active ? 'Active' : 'Inactive'}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                {editMode && (
                  <Switch
                    checked={editedAdmin.active}
                    onChange={(e) =>
                      handleEditChange('active', e.target.checked)
                    }
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
