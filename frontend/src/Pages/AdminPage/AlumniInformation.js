import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  AppBar, Toolbar, Typography, TextField, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle,
  Alert, Grid, Divider, Avatar
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";

import { Search, Upload, Download, Delete, Edit, Visibility } from "@mui/icons-material";
import SidebarMenu from "../Sidebar";
import "./AlumniInformation.css";

const sidebarWidth = 250;

function AlumniInformation() {

const [selectedYear, setSelectedYear] = useState("");
const [selectedProgram, setSelectedProgram] = useState("");
  const [alumniData, setAlumniData] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState({
    idNo: "",
    name: "",
    email: "",
    program: "",
    yearGraduated: "",
    // Additional fields
    fullName: "",
    school: "",
    level: "",
    recentGraduate: "",
    elementaryAtSMU: "",
    juniorHighAtSMU: "",
    seniorHighAtSMU: "",
    seniorHighStrand: "",
    tertiaryAtSMU: "",
    nonGraduateAttendance: "",
    employmentStatus: "",
    currentWork: "",
    companyAddress: "",
    address: "",
    facebookAccount: "",
    contactNumber: "",
    photo: ""
  });
  
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [importFile, setImportFile] = useState(null);
  const [importStatus, setImportStatus] = useState({ show: false, message: "", type: "info" });
  
  useEffect(() => {
    // Sample data for debugging with extended information
    const sampleData = [
      {
        idNo: "2021001",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        program: "Computer Science",
        yearGraduated: "2025",
        fullName: "Alice Marie Johnson",
        school: "School of Computing",
        level: "College",
        recentGraduate: "Yes",
        elementaryAtSMU: "2009",
        juniorHighAtSMU: "2013",
        seniorHighAtSMU: "2015",
        seniorHighStrand: "STEM",
        tertiaryAtSMU: "2021",
        nonGraduateAttendance: "N/A",
        employmentStatus: "Private Employee",
        currentWork: "Software Developer at Tech Solutions Inc.",
        companyAddress: "123 Tech Boulevard, Silicon City",
        address: "456 Main Street, Apt 7B, Metro City",
        facebookAccount: "facebook.com/alice.johnson",
        contactNumber: "(555) 123-4567",
        photo: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        idNo: "2021002",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        program: "Information Technology",
        yearGraduated: "2021",
        fullName: "Robert James Smith",
        school: "School of Computing",
        level: "College",
        recentGraduate: "Yes",
        elementaryAtSMU: "No",
        juniorHighAtSMU: "No",
        seniorHighAtSMU: "2015",
        seniorHighStrand: "STEM",
        tertiaryAtSMU: "2021",
        nonGraduateAttendance: "N/A",
        employmentStatus: "Self-Employed",
        currentWork: "Freelance Web Developer",
        companyAddress: "Works Remotely",
        address: "789 Oak Avenue, Downtown, Metro City",
        facebookAccount: "facebook.com/bob.smith",
        contactNumber: "(555) 987-6543",
        photo: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        idNo: "2021003",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        program: "Software Engineering",
        yearGraduated: "2022",
        fullName: "Charles Edward Brown",
        school: "School of Computing",
        level: "College",
        recentGraduate: "Yes",
        elementaryAtSMU: "2008",
        juniorHighAtSMU: "2012",
        seniorHighAtSMU: "No",
        seniorHighStrand: "",
        tertiaryAtSMU: "2022",
        nonGraduateAttendance: "N/A",
        employmentStatus: "Government Employee",
        currentWork: "IT Specialist at City Hall",
        companyAddress: "1 Government Plaza, Metro City",
        address: "101 Pine Street, Westside, Metro City",
        facebookAccount: "facebook.com/charlie.brown",
        contactNumber: "(555) 456-7890",
        photo: "https://randomuser.me/api/portraits/men/33.jpg"
      }
    ];
  
    setAlumniData(sampleData);
  }, []);
  
  // Fetch alumni data on component mount
  // useEffect(() => {
  //   axios.get("http://localhost:5001/api/admin/alumni")
  //     .then(response => {
  //       setAlumniData(response.data);
  //     })
  //     .catch(error => console.error("Error fetching alumni data:", error));
  // }, []);

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
  
const handleDownloadAll = async () => {
  try {
    // API request with optional filtering
    const response = await axios.get("http://localhost:5001/api/admin/alumni", {
      params: {
        yearGraduated: selectedYear || undefined, // Send only if selected
        program: selectedProgram || undefined,   // Send only if selected
      }
    });

    const data = response.data;

    if (!data.length) {
      alert("No records found for the selected filters.");
      return;
    }

    // Convert data to CSV format
    const csvContent = convertToCSV(data);

    // Create a Blob for download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `alumni_data_${selectedYear || "all"}_${selectedProgram || "all"}.csv`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading data:", error);
    alert("Failed to download alumni data.");
  }
};

// Convert JSON to CSV helper function
const convertToCSV = (data) => {
  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map(row => Object.values(row).join(",")).join("\n");
  return headers + rows;
};

  // Open and Close Import CSV Dialog
  const handleOpenImportDialog = () => {
    setImportOpen(true);
    setImportStatus({ show: false, message: "", type: "info" });
  };

  const handleCloseImportDialog = () => {
    setImportOpen(false);
    setImportFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "text/csv") {
      setImportStatus({
        show: true,
        message: "Please upload a CSV file",
        type: "error"
      });
      return;
    }
    setImportFile(file);
    setImportStatus({ show: false, message: "", type: "info" });
  };

  const handleImportCSV = () => {
    if (!importFile) {
      setImportStatus({
        show: true,
        message: "Please select a file to import",
        type: "error"
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", importFile);

    setImportStatus({
      show: true,
      message: "Importing data...",
      type: "info"
    });

    axios.post("http://localhost:5001/api/admin/alumni/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        // Assuming the API returns the newly imported alumni data
        setAlumniData([...alumniData, ...response.data]);
        setImportStatus({
          show: true,
          message: `Successfully imported ${response.data.length} alumni records`,
          type: "success"
        });
        
        // Optional: automatically close dialog after successful import
        setTimeout(() => {
          handleCloseImportDialog();
        }, 2000);
      })
      .catch(error => {
        console.error("Error importing alumni data:", error);
        setImportStatus({
          show: true,
          message: "Error importing data. Please check your file format and try again.",
          type: "error"
        });
      });
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
        <div style={{ marginBottom: "10px" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
  {/* Search Bar - 50% Width */}
  <TextField
    variant="outlined"
    size="small"
    placeholder="Search ID Number"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ width: "50%" }} // Ensures half-width for balance
  />

  {/* Year Filter */}
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

  {/* Program Filter */}
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

  {/* Import Button */}
  <Button 
    variant="outlined"
    color="primary" 
    startIcon={<Upload />} 
    onClick={handleOpenImportDialog}
    sx={{ height: "40px", minWidth: "130px" }} 
  >
    Import CSV
  </Button>

  {/* Download Button */}
  <Button 
    variant="outlined"
    color="primary" 
    startIcon={<Download />} 
    onClick={handleDownloadAll}
    sx={{ height: "40px", minWidth: "130px" }} 
  >
    Download All
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

        {/* Enhanced View Alumni Modal */}
        <Dialog open={viewOpen} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
          <DialogTitle style={{ textAlign: "center", fontWeight: "bold", background: "#272974", color: "white" }}>
            Alumni Profile
          </DialogTitle>
          <DialogContent style={{ padding: "24px" }}>
            <Grid container spacing={3}>
              {/* Left Column: Profile Picture and Basic Info */}
              <Grid item xs={12} md={4} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {selectedAlumni?.photo ? (
                  <Avatar 
                    src={selectedAlumni.photo} 
                    alt={selectedAlumni.name}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                ) : (
                  <Avatar 
                    sx={{ width: 150, height: 150, mb: 2, fontSize: 60, bgcolor: "#272974" }}
                  >
                    {selectedAlumni?.name?.charAt(0)}
                  </Avatar>
                )}
                <Typography variant="h5" style={{ fontWeight: "bold", textAlign: "center", marginBottom: "8px" }}>
                  {selectedAlumni?.fullName || selectedAlumni?.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{ textAlign: "center", marginBottom: "4px" }}>
                  {selectedAlumni?.email}
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{ textAlign: "center", marginBottom: "16px" }}>
                  {selectedAlumni?.contactNumber}
                </Typography>
                
                <Typography variant="body1" style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <strong>ID Number:</strong>&nbsp;{selectedAlumni?.idNo}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <strong>Facebook:</strong>&nbsp;{selectedAlumni?.facebookAccount}
                </Typography>
              </Grid>
              
              {/* Right Column: Detailed Information */}
              <Grid item xs={12} md={8}>
                <Paper elevation={0} style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px" }}>
                  <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "16px", color: "#272974" }}>
                    Educational Background
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>School/Level:</strong> {selectedAlumni?.school}/{selectedAlumni?.level}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Course/Program:</strong> {selectedAlumni?.program}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Recent Graduate (past 5 years):</strong> {selectedAlumni?.recentGraduate}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="subtitle1" style={{ fontWeight: "bold", marginTop: "16px", marginBottom: "8px" }}>
                    SMU Education History
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Elementary at SMU:</strong> {selectedAlumni?.elementaryAtSMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Junior High at SMU:</strong> {selectedAlumni?.juniorHighAtSMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Senior High at SMU:</strong> {selectedAlumni?.seniorHighAtSMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Senior High Strand:</strong> {selectedAlumni?.seniorHighStrand || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Tertiary at SMU:</strong> {selectedAlumni?.tertiaryAtSMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Non-Graduate Attendance:</strong> {selectedAlumni?.nonGraduateAttendance}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Paper elevation={0} style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px", marginTop: "16px" }}>
                  <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "16px", color: "#272974" }}>
                    Employment Information
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Employment Status:</strong> {selectedAlumni?.employmentStatus}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Current Work:</strong> {selectedAlumni?.currentWork}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Company Address:</strong> {selectedAlumni?.companyAddress}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ marginBottom: "8px" }}>
                        <strong>Home Address:</strong> {selectedAlumni?.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: "16px 24px" }}>
            <Button onClick={handleCloseViewDialog} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Alumni Modal - Keep simple with just basic info for now */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Edit Alumni Details</DialogTitle>
          <DialogContent>
            <TextField label="Full Name" name="name" fullWidth margin="dense" value={selectedAlumni?.name || ""} onChange={handleEditChange} />
            <TextField label="Email" name="email" fullWidth margin="dense" value={selectedAlumni?.email || ""} onChange={handleEditChange}  disabled />
            <TextField label="Program" name="program" fullWidth margin="dense" value={selectedAlumni?.program || ""} onChange={handleEditChange} />
            <TextField label="Year Graduated" name="yearGraduated" fullWidth margin="dense" value={selectedAlumni?.yearGraduated || ""} onChange={handleEditChange} />
            <TextField label="School" name="school" fullWidth margin="dense" value={selectedAlumni?.school || ""} onChange={handleEditChange} />
            <TextField label="Level" name="level" fullWidth margin="dense" value={selectedAlumni?.level || ""} onChange={handleEditChange} />
            <TextField label="Recent Graduate" name="recentGraduate" fullWidth margin="dense" value={selectedAlumni?.recentGraduate || ""} onChange={handleEditChange} />
            <TextField label="Elementary at SMU" name="elementaryAtSMU" fullWidth margin="dense" value={selectedAlumni?.elementaryAtSMU || ""} onChange={handleEditChange} />
            <TextField label="Junior High at SMU" name="juniorHighAtSMU" fullWidth margin="dense" value={selectedAlumni?.juniorHighAtSMU || ""} onChange={handleEditChange} />
            <TextField label="Senior High at SMU" name="seniorHighAtSMU" fullWidth margin="dense" value={selectedAlumni?.seniorHighAtSMU || ""} onChange={handleEditChange} />
            <TextField label="Senior High Strand" name="seniorHighStrand" fullWidth margin="dense" value={selectedAlumni?.seniorHighStrand || ""} onChange={handleEditChange} />
            <TextField label="Tertiary at SMU" name="tertiaryAtSMU" fullWidth margin="dense" value={selectedAlumni?.tertiaryAtSMU || ""} onChange={handleEditChange} />
            <TextField label="Non Graduate Attentance" name="nonGraduateAttentance" fullWidth margin="dense" value={selectedAlumni?.nonGraduateAttentance || ""} onChange={handleEditChange} />
            <TextField label="Employment Status" name="employmentStatus" fullWidth margin="dense" value={selectedAlumni?.employmentStatus || ""} onChange={handleEditChange} />
            <TextField label="Current Work" name="currentWork" fullWidth margin="dense" value={selectedAlumni?.currentWork || ""} onChange={handleEditChange} />
            <TextField label="Company Address" name="companyAddress" fullWidth margin="dense" value={selectedAlumni?.companyAddress || ""} onChange={handleEditChange} />
            <TextField label="Address" name="address" fullWidth margin="dense" value={selectedAlumni?.address || ""} onChange={handleEditChange} />
            <TextField label="Facebook Account" name="facebookAccount" fullWidth margin="dense" value={selectedAlumni?.facebookAccount || ""} onChange={handleEditChange}   disabled />
            <TextField label="Contact Number" name="contactNumber" fullWidth margin="dense" value={selectedAlumni?.contactNumber || ""} onChange={handleEditChange} />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Import CSV Modal */}
        <Dialog open={importOpen} onClose={handleCloseImportDialog}>
          <DialogTitle>Import Alumni Data</DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              Upload a CSV file containing alumni information. The CSV should have the following columns:
            </Typography>
            <Typography variant="body2" component="div" style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "4px", marginBottom: "20px", fontSize: "0.8rem" }}>
              idNo, name, email, password, program, yearGraduated, fullName, school, level, recentGraduate, elementaryAtSMU, juniorHighAtSMU, seniorHighAtSMU, seniorHighStrand, tertiaryAtSMU, nonGraduateAttendance, employmentStatus, currentWork, companyAddress, address, facebookAccount, contactNumber, photo
            </Typography>
            
            {importStatus.show && (
              <Alert severity={importStatus.type} style={{ marginBottom: "15px" }}>
                {importStatus.message}
              </Alert>
            )}
            
            <Button
              variant="outlined"
              component="label"
              fullWidth
              style={{ marginTop: "10px", padding: "10px" }}
            >
              Select CSV File
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            
            {importFile && (
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Selected file: {importFile.name}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImportDialog}>Cancel</Button>
            <Button 
              onClick={handleImportCSV} 
              variant="contained" 
              color="primary"
              disabled={!importFile}
            >
              Import
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AlumniInformation;