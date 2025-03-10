import React, { useState } from "react";
import { 
  AppBar, Toolbar, Typography, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle 
} from "@mui/material";
import { Search, Add, Delete, Edit, Visibility } from "@mui/icons-material";
import SidebarMenu from "../Sidebar";
import "./AlumniInformation.css";

const sidebarWidth = 250;

const initialAlumniData = [
  { id: "50747473", name: "CRUZ, LOURDES APULI", email: "lourdesc@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "56215333", name: "SEVILLA, HAVEN DIZON", email: "havensevilleja@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "64931760", name: "CRUZ, LINA ROBLES", email: "linacruz@mail.com", program: "MLIS", year: "2024 - 2025" },
  { id: "90068366", name: "ARCHETA, AMBER PEREZ", email: "amberarcheta@mail.com", program: "MLIS", year: "2024 - 2025" },
];

function AlumniInformation() {
  const [alumniData, setAlumniData] = useState(initialAlumniData);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAlumni, setNewAlumni] = useState({ id: "", name: "", email: "", program: "", year: "" });

  const handleOpenDialog = (alumni) => {
    setSelectedAlumni({ ...alumni });
    setOpen(true);
  };

  const handleOpenViewDialog = (alumni) => {
    setSelectedAlumni(alumni);
    setViewOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedAlumni(null);
  };

  const handleCloseViewDialog = () => {
    setViewOpen(false);
  };

  const handleDelete = (id) => {
    setAlumniData(alumniData.filter(alumni => alumni.id !== id));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumni(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setAlumniData(prevData => prevData.map(alumni => 
      alumni.id === selectedAlumni.id ? selectedAlumni : alumni
    ));
    handleCloseDialog();
  };

  // Open and Close Add Alumni Dialog
  const handleOpenAddDialog = () => {
    setAddOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddOpen(false);
    setNewAlumni({ id: "", name: "", email: "", program: "", year: "" });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewAlumni((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAlumni = () => {
    setAlumniData([...alumniData, newAlumni]);
    handleCloseAddDialog();
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

        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
  <TextField 
    variant="outlined" 
    size="small" 
    placeholder="Search ID Number" 
    fullWidth 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button 
    variant="contained" 
    startIcon={<Search />} 
    sx={{ height: "40px", minWidth: "150px" }} // Set height and width
  >
    Search
  </Button>
  <Button 
    variant="contained" 
    color="primary" 
    startIcon={<Add />} 
    onClick={handleOpenAddDialog}
    sx={{ height: "40px", minWidth: "150px" }} // Same height and width
  >
    Add Alumni
  </Button>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {alumniData.filter(alumni => alumni.id.includes(searchTerm)).map((alumni) => (
                <TableRow key={alumni.id}>
                  <TableCell>{alumni.id}</TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: "bold" }}>{alumni.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{alumni.email}</Typography>
                  </TableCell>
                  <TableCell>{alumni.program}</TableCell>
                  <TableCell>{alumni.year}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenViewDialog(alumni)}><Visibility /></IconButton>
                    <IconButton onClick={() => handleOpenDialog(alumni)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(alumni.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* View Alumni Modal */}
        {/* View Alumni Modal */}
<Dialog open={viewOpen} onClose={handleCloseViewDialog} maxWidth="sm" fullWidth>
  <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
    Alumni Details
  </DialogTitle>
  <DialogContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    
    {/* Profile Picture Placeholder */}
    <div 
      style={{ 
        width: "100px", height: "100px", borderRadius: "50%", 
        backgroundColor: "#d8d8d8", display: "flex", justifyContent: "center", 
        alignItems: "center", fontSize: "24px", fontWeight: "bold", color: "#555", 
        marginBottom: "15px" 
      }}
    >
      {selectedAlumni?.name.charAt(0)}
    </div>

    {/* User Info */}
    <Typography variant="h6" style={{ fontWeight: "bold", color: "#272974" }}>
      {selectedAlumni?.name}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      {selectedAlumni?.email}
    </Typography>

    <div 
      style={{ 
        width: "100%", background: "#f4f4f4", borderRadius: "10px", 
        padding: "15px", marginTop: "10px" 
      }}
    >
      <Typography variant="body1">
        <strong>Program:</strong> {selectedAlumni?.program}
      </Typography>
      <Typography variant="body1">
        <strong>  Year Graduated:</strong> {selectedAlumni?.year}
      </Typography>
    </div>

  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseViewDialog} color="primary" variant="contained">
      Close
    </Button>
  </DialogActions>
</Dialog>


        {/* Edit Alumni Modal */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Edit Alumni Details</DialogTitle>
          <DialogContent>
            <TextField label="Name" name="name" fullWidth margin="dense" value={selectedAlumni?.name || ""} onChange={handleEditChange} />
            <TextField label="Email" name="email" fullWidth margin="dense" value={selectedAlumni?.email || ""} onChange={handleEditChange} />
            <TextField label="Program" name="program" fullWidth margin="dense" value={selectedAlumni?.program || ""} onChange={handleEditChange} />
            <TextField label="Year Graduated" name="year" fullWidth margin="dense" value={selectedAlumni?.year || ""} onChange={handleEditChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Add Alumni Modal */}
        <Dialog open={addOpen} onClose={handleCloseAddDialog}>
          <DialogTitle>Add Alumni</DialogTitle>
          <DialogContent>
            <TextField label="ID" name="id" fullWidth margin="dense" value={newAlumni.id} onChange={handleAddChange} />
            <TextField label="Name" name="name" fullWidth margin="dense" value={newAlumni.name} onChange={handleAddChange} />
            <TextField label="Email" name="email" fullWidth margin="dense" value={newAlumni.email} onChange={handleAddChange} />
            <TextField label="Program" name="program" fullWidth margin="dense" value={newAlumni.program} onChange={handleAddChange} />
            <TextField label="Year Graduated" name="year" fullWidth margin="dense" value={newAlumni.year} onChange={handleAddChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button onClick={handleAddAlumni} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AlumniInformation;
