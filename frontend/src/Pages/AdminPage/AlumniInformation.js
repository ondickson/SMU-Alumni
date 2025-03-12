import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  AppBar, Toolbar, Typography, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle 
} from "@mui/material";
import { Search, Add, Delete, Edit, Visibility } from "@mui/icons-material";
import SidebarMenu from "../Sidebar";
import "./AlumniInformation.css";

const sidebarWidth = 250;

function AlumniInformation() {
  const [alumniData, setAlumniData] = useState([]);
  // const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [selectedAlumni, setSelectedAlumni] = useState({
    idNo: "",
    name: "",
    email: "",
    program: "",
    yearGraduated: ""
  });
  
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAlumni, setNewAlumni] = useState({
    idNo: "",
    name: "",
    email: "",
    password: "",
    program: "",
    yearGraduated: ""
  });
  

   // Fetch alumni data on component mount
   useEffect(() => {
    axios.get("http://localhost:5001/api/admin/alumni")
      .then(response => {
        // console.log(response.data);
        setAlumniData(response.data);
      })
      .catch(error => console.error("Error fetching alumni data:", error));
  }, []);

  const handleOpenDialog = (alumni) => {
    setSelectedAlumni({ ...alumni });
    setOpen(true);
    setSearchTerm("");
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

  const handleDelete = (idNo) => {
    axios.delete(`http://localhost:5001/api/admin/alumni/${idNo}`)
      .then(() => {
        setAlumniData(alumniData.filter(alumni => alumni.idNo !== idNo));
        console.log("Alumni deleted successfully");
      })
      .catch(error => console.error("Error deleting alumni:", error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumni(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5001/api/admin/alumni/${selectedAlumni.idNo}`, selectedAlumni)
      .then(response => {
        setAlumniData(prevData => prevData.map(alumni => 
          alumni.idNo === response.data.idNo ? response.data : alumni
        ));
        handleCloseDialog();
      })
      .catch(error => console.error("Error updating alumni:", error));
  };

  // Open and Close Add Alumni Dialog
  const handleOpenAddDialog = () => {
    setAddOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddOpen(false);
    setNewAlumni({ idNo: "", name: "", email: "", program: "", yearGraduated: "" });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewAlumni((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAlumni = () => {
    axios.post("http://localhost:5001/api/admin/alumni", newAlumni)
      .then(response => {
        // console.log(response.data);
        setAlumniData([...alumniData, response.data]);
        handleCloseAddDialog();
      })
      .catch(error => console.error("Error adding alumni:", error));
      // console.log(newAlumni);
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
    variant="outlined" 
    color="primary"
    startIcon={<Search />} 
    sx={{ height: "40px", minWidth: "150px" }} 
  >
    Search
  </Button>
  <Button 
    variant="outlined"
    color="primary" 
    startIcon={<Add />} 
    onClick={handleOpenAddDialog}
    sx={{ height: "40px", minWidth: "150px" }} 
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
            {alumniData
  .filter(alumni => alumni.idNo && alumni.idNo.toString().includes(searchTerm))
  .map((alumni) => (
                <TableRow key={alumni.idNo}>
                  <TableCell>{alumni.idNo}</TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: "bold" }}>{alumni.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{alumni.email}</Typography>
                  </TableCell>
                  <TableCell>{alumni.program}</TableCell>
                  <TableCell>{alumni.yearGraduated}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenViewDialog(alumni)}><Visibility /></IconButton>
                    <IconButton onClick={() => handleOpenDialog(alumni)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(alumni.idNo)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
        <strong>  Year Graduated:</strong> {selectedAlumni?.yearGraduated}
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
            <TextField label="Year Graduated" name="yearGraduated" fullWidth margin="dense" value={selectedAlumni?.yearGraduated || ""} onChange={handleEditChange} />
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
            <TextField label="ID" name="idNo" fullWidth margin="dense" value={newAlumni.idNo} onChange={handleAddChange} />
            <TextField label="Name" name="name" fullWidth margin="dense" value={newAlumni.name} onChange={handleAddChange} />
            <TextField label="Email" name="email" fullWidth margin="dense" value={newAlumni.email} onChange={handleAddChange} />
            <TextField label="Password" name="password" type="password" fullWidth margin="dense" value={newAlumni.password} onChange={handleAddChange} />
            <TextField label="Program" name="program" fullWidth margin="dense" value={newAlumni.program} onChange={handleAddChange} />
            <TextField label="Year Graduated" name="yearGraduated" fullWidth margin="dense" value={newAlumni.yearGraduated} onChange={handleAddChange} />
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
