import React from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function AccountSetting() {
  const users = [
    { name: 'Juan Dela Cruz', email: 'juandelacruz@gmail.com', role: 'Admin', status: 'Active' },
    { name: 'Nhizza', email: 'nuevanhizza@gmail.com', role: 'Department Head', status: 'Active' },
    { name: 'Department Head', email: 'head@gmail.com', role: 'Department Head', status: 'Active' },
    { name: 'The Admin', email: 'admin@gmail.com', role: 'Root', status: 'Active' },
  ];

  return (
    
    <Box p={3}>
      <h2>Account Settings</h2>
      <p>View and manage settings.</p>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <h3>Manage Users</h3>
              <p>Add, edit, or remove users from your system.</p>

              <Grid container spacing={2} mb={2}>
                <Grid item xs={3}><TextField fullWidth label="Name" variant="outlined" /></Grid>
                <Grid item xs={3}><TextField fullWidth label="Email" variant="outlined" /></Grid>
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

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>
                          <IconButton><Edit /></IconButton>
                          <IconButton color="error"><Delete /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

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
  );
}

export default AccountSetting;
