import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  
  Alert,
  Grid,
  Avatar,
  Tabs,
  Tab, // ✅ Corrected
  Select,
  MenuItem,
} from '@mui/material';


import {
  Upload,
  Download,
  Delete,
  Edit,
  Visibility
} from '@mui/icons-material';
import SidebarMenu from '../Sidebar';
import './AlumniInformation.css';

const sidebarWidth = 250;

function AlumniInformation() {
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [alumniData, setAlumniData] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState({
    
    email: '',
    firstName: '',
    middleName: '',
    lastNameName: '',
    suffix: '',
    birthday: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    fatherSuffix: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    motherSuffix: '',
    idNumber: '',
    schoolLevel: '',
    courseProgram: '',
    isGraduateWithinFiveYears: '',
    gradeSchoolInSMU: '',
    juniorHighInSMU: '',
    seniorHighInSMU: '',
    strandInSMU:'',
    tertiaryInSMU: '',
    studiedButNotGraduated: '',
    employmentStatus: [],
    otherEmploymentStatus: '',
    currentWork: '',
    companyAddress: '',
    address: '',
    facebookAccount: '',
    contactNumber: '',
    photo: null,
    topAchievements: '',
    curriculumVitae: null,
    signature: null
  });

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [importFile, setImportFile] = useState(null);
  const [importStatus, setImportStatus] = useState({
    show: false,
    message: '',
    type: 'info',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/admin/alumni')
      .then((response) => setAlumniData(response.data))
      .catch((error) => console.error('Error fetching alumni:', error));
  }, []);

  const handleAddAlumni = () => {
    axios
      .post('http://localhost:5001/api/admin/alumni', selectedAlumni)
      .then((response) => {
        setAlumniData((prevData) => [...prevData, response.data]); // Update UI
        handleCloseDialog(); // Close form
      })
      .catch((error) => console.error('Error adding alumni:', error));
  };

  const handleOpenDialog = (alumni) => {
    setSelectedAlumni({ ...alumni });
    setOpen(true);
    setSearchTerm('');
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

  const handleViewAlumni = (alumni) => {
    setSelectedAlumni(alumni);
    setViewOpen(true);
  };

  const handleDelete = (idNo) => {
    axios
      .delete(`http://localhost:5001/api/admin/alumni/${idNo}`)
      .then(() => {
        setAlumniData(alumniData.filter((alumni) => alumni.idNo !== idNo));
        console.log('Alumni deleted successfully');
      })
      .catch((error) => console.error('Error deleting alumni:', error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumni((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `http://localhost:5001/api/admin/alumni/${selectedAlumni.idNo}`,
        selectedAlumni,
      )
      .then((response) => {
        setAlumniData((prevData) =>
          prevData.map((alumni) =>
            alumni.idNo === response.data.idNo ? response.data : alumni,
          ),
        );
        handleCloseDialog();
      })
      .catch((error) => console.error('Error updating alumni:', error));
  };

  const handleDownloadAll = async () => {
    try {
      // API request with optional filtering
      const response = await axios.get(
        'http://localhost:5001/api/admin/alumni',
        {
          params: {
            yearGraduated: selectedYear || undefined, // Send only if selected
            program: selectedProgram || undefined, // Send only if selected
          },
        },
      );

      const data = response.data;

      if (!data.length) {
        alert('No records found for the selected filters.');
        return;
      }

      // Convert data to CSV format
      const csvContent = convertToCSV(data);

      // Create a Blob for download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `alumni_data_${selectedYear || 'all'}_${
        selectedProgram || 'all'
      }.csv`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Failed to download alumni data.');
    }
  };

  // Convert JSON to CSV helper function
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    return headers + rows;
  };

  // Open and Close Import CSV Dialog
  const handleOpenImportDialog = () => {
    setImportOpen(true);
    setImportStatus({ show: false, message: '', type: 'info' });
  };

  const handleCloseImportDialog = () => {
    setImportOpen(false);
    setImportFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'text/csv') {
      setImportStatus({
        show: true,
        message: 'Please upload a CSV file',
        type: 'error',
      });
      return;
    }
    setImportFile(file);
    setImportStatus({ show: false, message: '', type: 'info' });
  };

  const handleImportCSV = async () => {
    if (!importFile) {
      setImportStatus({
        show: true,
        message: 'Please select a file to import',
        type: 'error',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', importFile);

    setImportStatus({
      show: true,
      message: 'Importing data...',
      type: 'info',
    });

    try {
      const response = await axios.post(
        'http://localhost:5001/api/alumni/import',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      if (response.data && Array.isArray(response.data)) {
        setAlumniData((prevData) => [...response.data]);
        setImportStatus({
          show: true,
          message: `Successfully imported ${response.data.length} alumni records`,
          type: 'success',
        });

        // Auto-close the import dialog after 2 seconds
        setTimeout(() => {
          handleCloseImportDialog();
        }, 2000);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(
        'Error importing alumni data:',
        error.response?.data || error.message,
      );

      setImportStatus({
        show: true,
        message:
          error.response?.data?.error ||
          'Error importing data. Please check your file format and try again.',
        type: 'error',
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidebarMenu />
      <div
        style={{
          flex: 1,
          background: '#f8f9fa',
          padding: '20px',
          marginLeft: `${sidebarWidth}px`,
        }}
      >
        <AppBar position="static" style={{ background: '#272974' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Alumni Information
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginBottom: '10px' }}></div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {/* Search Bar - 50% Width */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search ID Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '50%' }} // Ensures half-width for balance
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
            sx={{ height: '40px', minWidth: '130px' }}
          >
            Import CSV
          </Button>

          {/* Download Button */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Download />}
            onClick={handleDownloadAll}
            sx={{ height: '40px', minWidth: '130px' }}
          >
            Download All
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID No.</strong>
                </TableCell>
                <TableCell>
                  <strong>Name and Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Program</strong>
                </TableCell>
                <TableCell>
                  <strong>Year Graduated</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumniData
                .filter(
                  (alumni) =>
                    alumni.idNo && alumni.idNo.toString().includes(searchTerm),
                )
                .map((alumni) => (
                  <TableRow key={alumni.idNo}>
                    <TableCell>{alumni.idNo}</TableCell>
                    <TableCell>
                    <Typography style={{ fontWeight: 'bold' }}>
  {`${alumni.firstName?.charAt(0).toUpperCase() + alumni.firstName?.slice(1).toLowerCase() || ''} 
    ${alumni.middleName ? alumni.middleName.charAt(0).toUpperCase() + '.' : ''} 
    ${alumni.lastName?.charAt(0).toUpperCase() + alumni.lastName?.slice(1).toLowerCase() || ''} 
    ${alumni.suffix ? alumni.suffix.toUpperCase() : ''}`}
</Typography>


                      <Typography variant="body2" color="textSecondary">
                        {alumni.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{alumni.program}</TableCell>
                    <TableCell>{alumni.tertiarySMU}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => handleViewAlumni(alumni)}>
  <Visibility/>
</IconButton>

                      <IconButton onClick={() => handleOpenDialog(alumni)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(alumni.idNo)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Enhanced View Alumni Modal */}
        <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
  <DialogTitle style={{ backgroundColor: '#272974', color: '#fff' }}>
    Edit Alumni Details
  </DialogTitle>
  <Tabs
    value={tabIndex}
    onChange={handleTabChange}
    indicatorColor="primary"
    textColor="primary"
  >
    <Tab label="Account Information" />
    <Tab label="Personal Information" />
    <Tab label="Educational Information" />
    <Tab label="Employment & Contact" />
  </Tabs>
  <DialogContent style={{ paddingTop: '20px' }}>
    {/* Account Information */}
    {tabIndex === 0 && (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="dense"
            value={selectedAlumni?.email || ''}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            value={selectedAlumni?.password || '********'}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="dense"
            value={selectedAlumni?.confirmPassword || '********'}
            disabled
          />
        </Grid>
        {/* Reset Password Button */}
        <Grid item xs={12} style={{ marginTop: '16px' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => alert('Reset Password clicked')}
          >
            Reset Password
          </Button>
        </Grid>
      </Grid>
    )}

    {/* Personal Information */}
    {tabIndex === 1 && (
      <Grid container spacing={2}>
        {/* Basic Personal Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.firstName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Middle Name"
            name="middleName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.middleName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.lastName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Suffix"
            name="suffix"
            fullWidth
            margin="dense"
            value={selectedAlumni?.suffix || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Birthday"
            name="birthday"
            type="date"
            fullWidth
            margin="dense"
            value={selectedAlumni?.birthday || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ID Number"
            name="idNumber"
            fullWidth
            margin="dense"
            value={selectedAlumni?.idNo || ''}
            onChange={handleEditChange}
          />
        </Grid>

        {/* Father's Information */}
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Father's Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="First Name"
            name="fatherFirstName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.fatherFirstName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Middle Name"
            name="fatherMiddleName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.fatherMiddleName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Last Name"
            name="fatherLastName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.fatherLastName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Suffix"
            name="fatherSuffix"
            fullWidth
            margin="dense"
            value={selectedAlumni?.fatherSuffix || ''}
            onChange={handleEditChange}
          />
        </Grid>

        {/* Mother's Information */}
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Mother's Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="First Name"
            name="motherFirstName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.motherFirstName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Middle Name"
            name="motherMiddleName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.motherMiddleName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Last Name"
            name="motherLastName"
            fullWidth
            margin="dense"
            value={selectedAlumni?.motherLastName || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Suffix"
            name="motherSuffix"
            fullWidth
            margin="dense"
            value={selectedAlumni?.motherSuffix || ''}
            onChange={handleEditChange}
          />
        </Grid>
      </Grid>
    )}

    {/* Educational Information */}
    {tabIndex === 2 && (
  <Grid container spacing={2}>
  {/* Employment Status */}
  <Grid item xs={12} sm={6}>
    <TextField
      select
      label="School/Level"
      name="School/Level"
      fullWidth
      margin="dense"
      value={selectedAlumni?.school || ""}
      onChange={handleEditChange}
    >
        <MenuItem value="School of Accountancy and Business">School of Accountancy and Business</MenuItem>
        <MenuItem value="School of Engineering, Architecture, and Information Technology">
          School of Engineering, Architecture, and Information Technology
        </MenuItem>
        <MenuItem value="School of Health and Natural Sciences">School of Health and Natural Sciences</MenuItem>
        <MenuItem value="School of Teacher Education and Humanities">School of Teacher Education and Humanities</MenuItem>
        <MenuItem value="School of Graduate Studies">School of Graduate Studies</MenuItem>
        <MenuItem value="College of Law">College of Law</MenuItem>
        <MenuItem value="Grade School">Grade School</MenuItem>
        <MenuItem value="Junior High School">Junior High School</MenuItem>
        <MenuItem value="Senior High School">Senior High School</MenuItem>
    </TextField>
  </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Course/Program"
            name="courseProgram"
            fullWidth
            margin="dense"
            value={selectedAlumni?.program || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Are you a graduate for the past 5 years?"
            name="isGraduateWithinFiveYears"
            fullWidth
            margin="dense"
            value={selectedAlumni?.recentGraduate || ''}
            onChange={handleEditChange}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Did you take your Grade School/Elementary in SMU? (If yes, year graduated or NO)"
            name="elementaryAtSMU"
            fullWidth
            margin="dense"
            value={selectedAlumni?.elementaryAtSMU || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Did you take your Junior High School in SMU? (If yes, year graduated or NO)"
            name="juniorHighAtSMU"
            fullWidth
            margin="dense"
            value={selectedAlumni?.juniorHighAtSMU || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Did you take your Senior High School in SMU? (If yes, year graduated and STRAND or NO)"
            name="seniorHighAtSMU"
            fullWidth
            margin="dense"
            value={selectedAlumni?.seniorHighAtSMU || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Did you take your tertiary education in SMU? (If yes, year graduated or NO)"
            name="tertiaryAtSMU"
            fullWidth
            margin="dense"
            value={selectedAlumni?.tertiaryAtSMU || ''}
            onChange={handleEditChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Did you study at SMU at any level but did not graduate? (Year and level or N/A)"
            name="nonGraduateAttendance"
            fullWidth
            margin="dense"
            value={selectedAlumni?.nonGraduateAttendance || ''}
            onChange={handleEditChange}
          />
        </Grid>
      </Grid>
    )}

    {/* Employment and Contact Information */}
    {tabIndex === 3 && (
  <Grid container spacing={2}>
    {/* Employment Status */}
    <Grid item xs={12} sm={6}>
      <TextField
        select
        label="Employment Status"
        name="employmentStatus"
        fullWidth
        margin="dense"
        value={selectedAlumni?.employmentStatus || ""}
        onChange={handleEditChange}
      >
        <MenuItem value="Government Employee">Government Employee</MenuItem>
        <MenuItem value="Private Employee">Private Employee</MenuItem>
        <MenuItem value="Self-Employed">Self-Employed</MenuItem>
        <MenuItem value="N/A">N/A</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
    </Grid>

    {/* Current Work */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Currently Work"
        name="currentWork"
        fullWidth
        margin="dense"
        value={selectedAlumni?.currentWork || ""}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Company Address */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Company Address"
        name="companyAddress"
        fullWidth
        margin="dense"
        value={selectedAlumni?.companyAddress || ""}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Home Address */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Address"
        name="address"
        fullWidth
        margin="dense"
        value={selectedAlumni?.address || ""}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Facebook Account */}
    <Grid item xs={12}>
      <TextField
        label="Facebook Account"
        name="facebookAccount"
        fullWidth
        margin="dense"
        value={selectedAlumni?.facebookAccount || ""}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Contact Number */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Contact Number"
        name="contactNumber"
        fullWidth
        margin="dense"
        value={selectedAlumni?.contactNumber || ""}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Top 5 Achievements */}
    <Grid item xs={12} sm={6}>
      <TextField
        label="Top 5 Achievements"
        name="topAchievements"
        multiline
        rows={3}
        fullWidth
        margin="dense"
        value={selectedAlumni?.achievements?.join(", ") || ""}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Upload Alumni ID Application */}
    <Grid item xs={12}>
      <TextField
        type="file"
        label="Upload Alumni ID Application"
        name="alumniIdApplication"
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: "image/*,application/pdf",
        }}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Upload Curriculum Vitae */}
    <Grid item xs={12}>
      <TextField
        type="file"
        label="Upload Curriculum Vitae"
        name="curriculumVitae"
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: "application/pdf",
        }}
        onChange={handleEditChange}
      />
    </Grid>

    {/* Upload Signature */}
    <Grid item xs={12}>
      <TextField
        type="file"
        label="Upload Signature"
        name="signature"
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: "image/*",
        }}
        onChange={handleEditChange}
      />
    </Grid>
  </Grid>
)}

  </DialogContent>
 

      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSaveEdit ? handleSaveEdit : handleAddAlumni} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>


        {/* Import CSV Modal */}
        <Dialog open={importOpen} onClose={handleCloseImportDialog}>
          <DialogTitle>Import Alumni Data</DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              Upload a CSV file containing alumni information. The CSV should
              have the following columns:
            </Typography>
            <Typography
              variant="body2"
              component="div"
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '20px',
                fontSize: '0.8rem',
              }}
            >
              idNo, name, email, password, program, yearGraduated, fullName,
              school, level, recentGraduate, elementaryAtSMU, juniorHighAtSMU,
              seniorHighAtSMU, seniorHighStrand, tertiaryAtSMU,
              nonGraduateAttendance, employmentStatus, currentWork,
              companyAddress, address, facebookAccount, contactNumber, photo
            </Typography>

            {importStatus.show && (
              <Alert
                severity={importStatus.type}
                style={{ marginBottom: '15px' }}
              >
                {importStatus.message}
              </Alert>
            )}

            <Button
              variant="outlined"
              component="label"
              fullWidth
              style={{ marginTop: '10px', padding: '10px' }}
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
              <Typography variant="body2" style={{ marginTop: '10px' }}>
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
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle style={{ backgroundColor: '#272974', color: '#fff', textAlign: 'center' }}>
    Alumni Profile
  </DialogTitle>
  <DialogContent style={{ padding: '20px' }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
        <Avatar
          sx={{ bgcolor: '#272974', width: 100, height: 100, margin: '0 auto' }}
        >
          {selectedAlumni?.firstName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h6" style={{ marginTop: '10px' }}>
  {`${selectedAlumni?.firstName?.charAt(0).toUpperCase() + selectedAlumni?.firstName?.slice(1).toLowerCase() || ''} 
    ${selectedAlumni?.middleName ? selectedAlumni?.middleName.charAt(0).toUpperCase() + selectedAlumni?.middleName.slice(1).toLowerCase() + ' ' : ''} 
    ${selectedAlumni?.lastName?.charAt(0).toUpperCase() + selectedAlumni?.lastName?.slice(1).toLowerCase() || ''} 
    ${selectedAlumni?.suffix ? selectedAlumni?.suffix.toUpperCase() : ''}`}
</Typography>

        <Typography variant="body2" color="textSecondary">
          {selectedAlumni?.email}
        </Typography>
        <Typography variant="body2">
          <strong>ID Number:</strong> {selectedAlumni?.idNo}
        </Typography>
        <Typography variant="body2">
          <strong>Facebook:</strong> {selectedAlumni?.facebookAccount || 'N/A'}
        </Typography>
      </Grid>

      {/* Educational Background */}
      <Grid item xs={12} sm={8}>
        <Typography variant="h6" style={{ color: '#272974', fontWeight: 'bold' }}>
          Educational Background
        </Typography>
        <Paper elevation={2} style={{ padding: '10px', marginBottom: '10px' }}>
          <Typography variant="body2">
            <strong>School/Level:</strong> {selectedAlumni?.school || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Course/Program:</strong> {selectedAlumni?.program || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Recent Graduate (past 5 years):</strong> {selectedAlumni?.recentGraduate || 'N/A'}
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px', fontWeight: 'bold' }}>
            SMU Education History
          </Typography>
          <Typography variant="body2">
            <strong>Elementary at SMU:</strong> {selectedAlumni?.elementarySMU || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Junior High at SMU:</strong> {selectedAlumni?.juniorHighSMU || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Senior High at SMU:</strong> {selectedAlumni?.seniorHighSMU || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Senior High Strand:</strong> {selectedAlumni?.strandInSMU || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Tertiary at SMU:</strong> {selectedAlumni?.tertiarySMU || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Non-Graduate Attendance:</strong> {selectedAlumni?.nonGraduateSMU || 'N/A'}
          </Typography>
        </Paper>

        {/* Employment Information */}
        <Typography variant="h6" style={{ color: '#272974', fontWeight: 'bold', marginTop: '10px' }}>
          Employment Information
        </Typography>
        <Paper elevation={2} style={{ padding: '10px' }}>
          <Typography variant="body2">
            <strong>Employment Status:</strong> {selectedAlumni?.employmentStatus || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Current Work:</strong> {selectedAlumni?.currentWork || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Company Address:</strong> {selectedAlumni?.companyAddress || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Home Address:</strong> {selectedAlumni?.address || 'N/A'}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setViewOpen(false)} color="primary" variant="contained">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}

export default AlumniInformation;