import React from "react";
import { 
  AppBar, Toolbar, Typography, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton 
} from "@mui/material";
import { Search, List } from "@mui/icons-material";
import SidebarMenu from "../Sidebar";
import "./AlumniInformation.css";

const sidebarWidth = 250;

const alumniData = [
  { id: "50747473", name: "CRUZ, LOURDES APULI", email: "lourdesc@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "56215333", name: "SEVILLA, HAVEN DIZON", email: "havensevilleja@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "64931760", name: "CRUZ, LINA ROBLES", email: "linacruz@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "90068366", name: "ARCHETA, AMBER PEREZ", email: "amberarcheta@mail.com", program: "MLIS", year: "2024 - 2025" },
];

function AlumniInformation() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarMenu />
      <div style={{ flex: 1, background: "#f8f9fa", padding: "20px", marginLeft: `${sidebarWidth}px` }}>
        
        <AppBar position="static" style={{ background: "#272974" }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Alumni Information
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
          <TextField variant="outlined" size="small" placeholder="Search ID Number" fullWidth />
          <Button variant="contained" startIcon={<Search />}>Search</Button>
        </div>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID No.</strong></TableCell>
                <TableCell><strong>Name and Email</strong></TableCell>
                <TableCell><strong>Program</strong></TableCell>
                <TableCell><strong>Year Graduated</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumniData.map((alumni) => (
                <TableRow key={alumni.id}>
                  <TableCell>
                    <Button variant="contained" style={{ fontWeight: "bold" }}>{alumni.id}</Button>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: "bold" }}>{alumni.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{alumni.email}</Typography>
                  </TableCell>
                  <TableCell>{alumni.program}</TableCell>
                  <TableCell>{alumni.year}</TableCell>
                  <TableCell>
                    <Button variant="outlined" startIcon={<List />}>View Profile</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AlumniInformation;
