import React, { useState } from "react";
import { 
  AppBar, Toolbar, Typography, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem
} from "@mui/material";
import { Search, Add, Delete, Edit, Visibility } from "@mui/icons-material";
import SidebarMenu from "../Sidebar";
import "./AlumniInformation.css";

const sidebarWidth = 250;

const initialAlumniData = [
  { id: "50747473", name: "CRUZ, LOURDES APULI", email: "lourdesc@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "56215333", name: "SEVILLA, HAVEN DIZON", email: "havensevilleja@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "64931760", name: "CRUZ, LINA ROBLES", email: "linacruz@mail.com", program: "BSIT", year: "2023 - 2024" },
  { id: "90068366", name: "ARCHETA, AMBER PEREZ", email: "amberarcheta@mail.com", program: "BSCS", year: "2022 - 2023" },
];

function AlumniInformation() {
  const [alumniData, setAlumniData] = useState(initialAlumniData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleSearch = () => {
    return alumniData.filter((alumni) =>
      alumni.id.includes(searchTerm) &&
      (selectedYear ? alumni.year === selectedYear : true) &&
      (selectedProgram ? alumni.program === selectedProgram : true)
    );
  };

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

        <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
          <TextField 
            variant="outlined" 
            size="small" 
            placeholder="Search ID Number" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Years</MenuItem>
            <MenuItem value="2024 - 2025">2024 - 2025</MenuItem>
            <MenuItem value="2023 - 2024">2023 - 2024</MenuItem>
            <MenuItem value="2022 - 2023">2022 - 2023</MenuItem>
          </Select>

          <Select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Programs</MenuItem>
            <MenuItem value="MLIS">MLIS</MenuItem>
            <MenuItem value="BSIT">BSIT</MenuItem>
            <MenuItem value="BSCS">BSCS</MenuItem>
          </Select>

        
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID No.</strong></TableCell>
                <TableCell><strong>Name and Email</strong></TableCell>
                <TableCell><strong>Program</strong></TableCell>
                <TableCell><strong>Year Graduated</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch().map((alumni) => (
                <TableRow key={alumni.id}>
                  <TableCell>{alumni.id}</TableCell>
                  <TableCell>
                    <Typography>{alumni.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{alumni.email}</Typography>
                  </TableCell>
                  <TableCell>{alumni.program}</TableCell>
                  <TableCell>{alumni.year}</TableCell>
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