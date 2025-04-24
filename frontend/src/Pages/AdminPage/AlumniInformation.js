import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Grid,
  Radio,
  RadioGroup,
  Avatar,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';

import {
  Upload,
  Download,
  Delete,
  Edit,
  Visibility,
  VisibilityOff,
  PhotoCamera,
} from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';

import SidebarMenu from '../Sidebar';
import './AlumniInformation.css';

const sidebarWidth = 250;

function AlumniInformation() {
  // const [alumniData, setAlumniData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [alumniData, setAlumniData] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState({
    // Account Information
    email: '',
    password: '',
    confirmPassword: '',

    // Personal Information
    idNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthday: '',

    // Father's Information
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    fatherSuffix: '',

    // Mother's Information
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    motherSuffix: '',

    // Educational Information
    school: '',
    program: '',
    recentGraduate: '',
    elementarySMU: '',
    juniorHighSMU: '',
    seniorHighSMU: '',
    strandInSMU: '',
    tertiarySMU: '',
    nonGraduateSMU: '',

    // Employment and Contact Information
    employmentStatus: '',
    otherEmploymentStatus: '',
    currentWork: '',
    companyAddress: '',
    address: '',
    facebookAccount: '',
    contactNumber: '',
    achievements: ['', '', '', '', ''],

    // Files and Photos
    photo: '',
    photoPreview: null,
    curriculumVitae: null,
    curriculumVitaePreview: null,
    alumniIdApplication: null,
    signature: null,
    signaturePreview: null,
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

  // Confirm delete user
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);

  // Toggle password hide/unhide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle Edit Alumni Preview
  const [alumniPreviewOpen, setAlumniPreviewOpen] = useState(false);
  const [alumniPreviewImage, setAlumniPreviewImage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Toggle active/inactive switch
  // Fetch alumni data from backend when component mounts
  useEffect(() => {
    fetchAlumni();
  }, []);

  // Fetch alumni from backend
  const fetchAlumni = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5001/api/alumni/alumni',
      );
      setAlumniData(response.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/alumni/alumni')
      .then((response) => setAlumniData(response.data))
      .catch((error) => console.error('Error fetching alumni:', error));
  }, []);

  const handleAddAlumni = () => {
    axios
      .post('http://localhost:5001/api/alumni/alumni', selectedAlumni)
      .then((response) => {
        setAlumniData((prevData) => [...prevData, response.data]); // Update UI
        handleCloseDialog(); // Close form
      })
      .catch((error) => console.error('Error adding alumni:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumni((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
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

  // Handle delete
  const handleDelete = (idNo) => {
    axios
      .delete(`http://localhost:5001/api/alumni/alumni/${idNo}`)
      .then(() => {
        setAlumniData(alumniData.filter((alumni) => alumni.idNo !== idNo));
        console.log('Alumni deleted successfully');
      })
      .catch((error) => console.error('Error deleting alumni:', error));
  };

  const handleDeleteClick = (idNo) => {
    setSelectedIdToDelete(idNo);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedIdToDelete) {
      handleDelete(selectedIdToDelete);
    }
    setOpenDeleteDialog(false);
    setSelectedIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedIdToDelete(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAlumni((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `http://localhost:5001/api/alumni/alumni/${selectedAlumni.idNo}`,
        selectedAlumni,
      )
      .then((response) => {
        setAlumniData((prevData) =>
          prevData.map((alumni) =>
            alumni.idNo === response.data.alumni.idNo
              ? response.data.alumni
              : alumni,
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
        'http://localhost:5001/api/alumni/alumni',
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

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type !== 'text/csv') {
  //     setImportStatus({
  //       show: true,
  //       message: 'Please upload a CSV file',
  //       type: 'error',
  //     });
  //     return;
  //   }
  //   setImportFile(file);
  //   setImportStatus({ show: false, message: '', type: 'info' });
  // };
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setSelectedAlumni((prev) => {
      const updated = { ...prev };

      if (type === 'photo') {
        updated.photoFile = file;
        updated.photoPreview = previewUrl;
      } else if (type === 'curriculumVitae') {
        updated.curriculumVitaeFile = file;
        updated.curriculumVitaePreview = previewUrl;
        updated.curriculumVitae = { fileName: file.name };
      } else if (type === 'signature') {
        updated.signatureFile = file;
        updated.signaturePreview = previewUrl;
        updated.signature = { fileName: file.name };
      }

      return updated;
    });
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

  // Handle toggle for alumni active status
  const handleToggleAlumniActive = async (idNo, currentActive) => {
    try {
      // Immediately update local state
      const updatedData = alumniData.map((a) =>
        a.idNo === idNo ? { ...a, active: !currentActive } : a,
      );
      setAlumniData(updatedData); // Update alumniData state with new data

      // Then update the backend
      await axios.put(`http://localhost:5001/api/alumni/alumni/${idNo}`, {
        active: !currentActive,
      });

      // Optional: refetch to ensure complete sync between backend and frontend
      // await fetchAlumni();
    } catch (error) {
      console.error('Error updating alumni:', error);
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
            style={{ width: '50%' }}
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

        {/* Table Header */}
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
                  <strong>Activate Alumni</strong>
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
                        {[
                          alumni.firstName,
                          alumni.middleName,
                          alumni.lastName,
                          alumni.suffixName,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {alumni.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{alumni.program}</TableCell>
                    <TableCell>{alumni.tertiarySMU}</TableCell>
                    {/* toggle active/inactive */}
                    <TableCell align="center">
                      <Switch
                        checked={alumni.active}
                        onChange={() =>
                          handleToggleAlumniActive(alumni.idNo, alumni.active)
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

                    <TableCell>
                      <IconButton onClick={() => handleOpenViewDialog(alumni)}>
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => handleOpenDialog(alumni)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(alumni.idNo)}
                      >
                        <Delete />
                      </IconButton>
                      <Dialog
                        open={openDeleteDialog}
                        onClose={handleCancelDelete}
                      >
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this alumni? This
                            action cannot be undone.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancelDelete} color="primary">
                            No
                          </Button>
                          <Button
                            onClick={handleConfirmDelete}
                            color="error"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Enhanced View Alumni Modal */}
        <Dialog
          open={viewOpen}
          onClose={handleCloseViewDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              background: '#272974',
              color: 'white',
            }}
          >
            Alumni Profile
          </DialogTitle>
          <DialogContent style={{ padding: '10px' }}>
            <Grid container spacing={3}>
              {/* Left Column: Profile Picture and Basic Info */}
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {selectedAlumni?.photo ? (
                  <Avatar
                    src={`http://localhost:5001/${selectedAlumni.photo}`}
                    alt={selectedAlumni.name}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      mb: 2,
                      fontSize: 60,
                      bgcolor: '#272974',
                    }}
                  >
                    {selectedAlumni?.name?.charAt(0)}
                  </Avatar>
                )}

                {/* User name, email, and contact number */}
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '8px',
                  }}
                >
                  {`${selectedAlumni?.firstName || ''} ${
                    selectedAlumni?.middleName || ''
                  } ${selectedAlumni?.lastName || ''} ${
                    selectedAlumni?.suffix || ''
                  }`.trim()}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ textAlign: 'center', marginBottom: '4px' }}
                >
                  {selectedAlumni?.email}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ textAlign: 'center', marginBottom: '16px' }}
                >
                  {selectedAlumni?.contactNumber}
                </Typography>

                <Typography
                  variant="body1"
                  style={{
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <strong>ID Number:</strong>&nbsp;{selectedAlumni?.idNo}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                  }}
                >
                  <strong>Facebook:</strong>&nbsp;
                  {selectedAlumni?.facebookAccount}
                </Typography>
              </Grid>

              {/* Right Column: Detailed Information */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '10px',
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '16px',
                      color: '#272974',
                    }}
                  >
                    Educational Background
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>School/Level:</strong> {selectedAlumni?.school}/
                        {selectedAlumni?.level}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Course/Program:</strong>{' '}
                        {selectedAlumni?.program}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Recent Graduate (past 5 years):</strong>{' '}
                        {selectedAlumni?.recentGraduate}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="subtitle1"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '0px',
                    }}
                  >
                    SMU Education History
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Elementary at SMU:</strong>{' '}
                        {selectedAlumni?.elementarySMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Junior High at SMU:</strong>{' '}
                        {selectedAlumni?.juniorHighSMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Senior High at SMU:</strong>{' '}
                        {selectedAlumni?.seniorHighSMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Senior High Strand:</strong>{' '}
                        {selectedAlumni?.strandInSMU || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Tertiary at SMU:</strong>{' '}
                        {selectedAlumni?.tertiarySMU}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1">
                        <strong>Non-Graduate Attendance:</strong>{' '}
                        {selectedAlumni?.nonGraduateSMU}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper
                  elevation={0}
                  style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '10px',
                    marginTop: '5px',
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '5px',
                      color: '#272974',
                    }}
                  >
                    Employment Information
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1">
                        <strong>Employment Status:</strong>{' '}
                        {selectedAlumni?.employmentStatus}
                      </Typography>
                    </Grid>

                    {/* Show otherEmploymentStatus when employmentStatus is "Other" */}
                    {selectedAlumni?.employmentStatus?.includes('Other') &&
                      selectedAlumni?.otherEmploymentStatus && (
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            <strong>Currently:</strong>{' '}
                            {selectedAlumni?.otherEmploymentStatus}
                          </Typography>
                        </Grid>
                      )}

                    {/* Show currentWork for non-"Other" employment statuses */}
                    {!selectedAlumni?.employmentStatus?.includes('Other') &&
                      selectedAlumni?.currentWork && (
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            <strong>Current Work:</strong>{' '}
                            {selectedAlumni?.currentWork}
                          </Typography>
                        </Grid>
                      )}

                    {/* Hide Company Address if employmentStatus is "Other" */}
                    {!selectedAlumni?.employmentStatus?.includes('Other') &&
                      selectedAlumni?.companyAddress && (
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            <strong>Company Address:</strong>{' '}
                            {selectedAlumni?.companyAddress}
                          </Typography>
                        </Grid>
                      )}

                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Home Address:</strong> {selectedAlumni?.address}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: '16px 24px' }}>
            <Button
              onClick={handleCloseViewDialog}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Alumni Dialog */}
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
                    onChange={handleChange}
                  />
                </Grid>
                {/* Password Field */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.password || ''}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Confirm Password Field */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.confirmPassword || ''}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    value={
                      selectedAlumni?.birthday
                        ? selectedAlumni.birthday.split('T')[0]
                        : ''
                    }
                    onChange={handleEditChange}
                    variant="outlined"
                    className="form-field"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="ID Number"
                    name="idNo"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.idNo || ''}
                    onChange={handleEditChange}
                    disabled
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
                    value={selectedAlumni?.school || ''}
                    onChange={handleEditChange}
                  >
                    <MenuItem value="School of Accountancy and Business">
                      School of Accountancy and Business
                    </MenuItem>
                    <MenuItem value="School of Engineering, Architecture, and Information Technology">
                      School of Engineering, Architecture, and Information
                      Technology
                    </MenuItem>
                    <MenuItem value="School of Health and Natural Sciences">
                      School of Health and Natural Sciences
                    </MenuItem>
                    <MenuItem value="School of Teacher Education and Humanities">
                      School of Teacher Education and Humanities
                    </MenuItem>
                    <MenuItem value="School of Graduate Studies">
                      School of Graduate Studies
                    </MenuItem>
                    <MenuItem value="College of Law">College of Law</MenuItem>
                    <MenuItem value="Grade School">Grade School</MenuItem>
                    <MenuItem value="Junior High School">
                      Junior High School
                    </MenuItem>
                    <MenuItem value="Senior High School">
                      Senior High School
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Course/Program"
                    name="program"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.program || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Are you a graduate for the past five years?
                  </Typography>
                  <RadioGroup
                    row
                    name="recentGraduate"
                    value={
                      selectedAlumni?.recentGraduate === 'yes' ? 'yes' : 'no'
                    }
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Did you take your Grade School/Elementary in SMU? (If yes, year graduated or NO)"
                    name="elementarySMU"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.elementarySMU || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Did you take your Junior High School in SMU? (If yes, year graduated or NO)"
                    name="juniorHighSMU"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.juniorHighSMU || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Did you take your Senior High School in SMU? (If yes, year graduated and STRAND or NO)"
                    name="seniorHighSMU"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.seniorHighSMU || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Strand in SMU"
                    name="strandInSMU"
                    margin="dense"
                    value={selectedAlumni?.strandInSMU || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Did you take your tertiary education in SMU? (If yes, year graduated or NO)"
                    name="tertiarySMU"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.tertiarySMU || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Did you study at SMU at any level but did not graduate? (Year and level or N/A)"
                    name="nonGraduateSMU"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.nonGraduateSMU || ''}
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
                    value={selectedAlumni?.employmentStatus || ''}
                    onChange={handleEditChange}
                  >
                    <MenuItem value="Government Employee">
                      Government Employee
                    </MenuItem>
                    <MenuItem value="Private Employee">
                      Private Employee
                    </MenuItem>
                    <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                    <MenuItem value="N/A">N/A</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                {/* otherEmploymentStatus */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Currently"
                    name="otherEmploymentStatus"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.otherEmploymentStatus || ''}
                    onChange={handleEditChange}
                  />
                </Grid>

                {/* Current Work */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Currently Work"
                    name="currentWork"
                    fullWidth
                    margin="dense"
                    value={selectedAlumni?.currentWork || ''}
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
                    value={selectedAlumni?.companyAddress || ''}
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
                    value={selectedAlumni?.address || ''}
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
                    value={selectedAlumni?.facebookAccount || ''}
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
                    value={selectedAlumni?.contactNumber || ''}
                    onChange={handleEditChange}
                  />
                </Grid>

                {/* Top 5 Achievements */}
                <Grid item xs={12} sm={12}>
                  <label
                    style={{
                      fontWeight: 'bold',
                      marginBottom: 8,
                      display: 'block',
                    }}
                  >
                    Top 5 Achievements
                  </label>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <TextField
                      key={index}
                      label={`Achievement ${index + 1}`}
                      name={`achievements[${index}]`}
                      fullWidth
                      margin="dense"
                      value={selectedAlumni?.achievements?.[index] || ''}
                      onChange={(e) => {
                        const newAchievements = [
                          ...(selectedAlumni?.achievements || []),
                        ];
                        newAchievements[index] = e.target.value;
                        handleEditChange({
                          target: {
                            name: 'achievements',
                            value: newAchievements,
                          },
                        });
                      }}
                    />
                  ))}
                </Grid>

                {/* Update Photo, Curriculum Vitae, and Signature */}
                <Dialog
                  open={alumniPreviewOpen}
                  onClose={() => setAlumniPreviewOpen(false)}
                  maxWidth="md"
                >
                  <img
                    src={alumniPreviewImage}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Dialog>

                <Grid
                  container
                  spacing={2}
                  alignItems="flex-end"
                  sx={{ mt: 4 }}
                >
                  {/* Upload Alumni Photo */}
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {selectedAlumni?.photo ? (
                      <div
                        onClick={() => {
                          setAlumniPreviewImage(
                            `http://localhost:5001/${selectedAlumni.photo}`,
                          );
                          setAlumniPreviewOpen(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Avatar
                          src={
                            selectedAlumni.photoPreview ||
                            `http://localhost:5001/${selectedAlumni.photo}`
                          }
                          alt={selectedAlumni.name}
                          sx={{ width: 150, height: 150, mb: 2 }}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            const preview =
                              selectedAlumni.photoPreview ||
                              `http://localhost:5001/${selectedAlumni.photo}`;
                            setAlumniPreviewImage(preview);
                            setAlumniPreviewOpen(true);
                          }}
                        />
                      </div>
                    ) : (
                      <Avatar
                        sx={{
                          width: 150,
                          height: 150,
                          mb: 2,
                          fontSize: 60,
                          bgcolor: '#272974',
                        }}
                      >
                        {selectedAlumni?.name?.charAt(0)}
                      </Avatar>
                    )}

                    <Button
                      variant="contained"
                      component="label"
                      // className="upload-button"
                      startIcon={<PhotoCamera />}
                    >
                      Update Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photo')}
                      />
                    </Button>
                  </Grid>

                  {/* Upload Curriculum Vitae */}
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {selectedAlumni.curriculumVitaePreview ? (
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <a
                          href={selectedAlumni.curriculumVitaePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View CV:
                          <br />
                          <strong>
                            {selectedAlumni.curriculumVitae?.fileName}
                          </strong>
                        </a>
                      </div>
                    ) : selectedAlumni.curriculumVitae?.filePath ? (
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <a
                          href={`http://localhost:5001/uploads/${selectedAlumni.curriculumVitae.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View CV:
                          <br />
                          <strong>
                            {selectedAlumni.curriculumVitae.fileName}
                          </strong>
                        </a>
                      </div>
                    ) : (
                      <p style={{ marginBottom: 16, textAlign: 'center' }}>
                        No CV uploaded yet.
                      </p>
                    )}

                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<DescriptionIcon />}
                    >
                      Update Curriculum Vitae
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx,image/*"
                        onChange={(e) => handleFileChange(e, 'curriculumVitae')}
                      />
                    </Button>
                  </Grid>

                  {/* Upload Signature */}
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {selectedAlumni.signaturePreview ? (
                      selectedAlumni.signaturePreview.endsWith('.pdf') ? (
                        <div style={{ textAlign: 'center', marginBottom: 16 }}>
                          <a
                            href={selectedAlumni.signaturePreview}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📝 View Signature
                          </a>
                        </div>
                      ) : (
                        <img
                          src={selectedAlumni.signaturePreview}
                          alt="Signature Preview"
                          style={{
                            width: 200,
                            height: 'auto',
                            border: '1px solid #ccc',
                            borderRadius: 8,
                            marginBottom: 16,
                          }}
                        />
                      )
                    ) : selectedAlumni.signature?.filePath ? (
                      selectedAlumni.signature.filePath.endsWith('.pdf') ? (
                        <div style={{ textAlign: 'center', marginBottom: 16 }}>
                          <a
                            href={`http://localhost:5001/${selectedAlumni.signature.filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📝 View Signature:
                            <br />
                            <strong>{selectedAlumni.signature.fileName}</strong>
                          </a>
                        </div>
                      ) : (
                        <img
                          src={`http://localhost:5001/${selectedAlumni.signature.filePath}`}
                          alt="Uploaded Signature"
                          style={{
                            width: 200,
                            height: 'auto',
                            border: '1px solid #ccc',
                            borderRadius: 8,
                            marginBottom: 16,
                          }}
                        />
                      )
                    ) : (
                      <p style={{ marginBottom: 16, textAlign: 'center' }}>
                        No signature uploaded yet.
                      </p>
                    )}

                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<DescriptionIcon />}
                    >
                      Update Signature
                      <input
                        type="file"
                        hidden
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'signature')}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSaveEdit ? handleSaveEdit : handleAddAlumni}
              variant="contained"
              color="primary"
            >
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
    </div>
  );
}

export default AlumniInformation;
