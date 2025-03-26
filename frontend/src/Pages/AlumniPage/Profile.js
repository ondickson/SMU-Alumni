import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  TextField,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AccountCircle, PhotoCamera } from '@mui/icons-material';
// import { AccountCircle, Badge, PhotoCamera } from '@mui/icons-material';
import SignatureCanvas from 'react-signature-canvas';
import Sidebar from '../Sidebar';
import './Profile.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const sigCanvasRef = useRef(null); // ✅ Correctly placed here
  // const clearSignature = () => {
  //   if (sigCanvasRef.current) {
  //     sigCanvasRef.current.clear();
  //   }
  // };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState({
    // Account Information
    email: '',
    password: '',
    confirmPassword: '',

    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    idNo: '',
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
    currentWork: '',
    companyAddress: '',
    address: '',
    facebookAccount: '',
    contactNumber: '',
    achievements: ['', '', '', '', ''],

    // Files and Photos
    photo: '',
    curriculumVitae: null,
    alumniIdApplication: null,
    signature: null,
  });
  const getValue = (value) => (value ? value : 'N/A');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        // console.log('Token being sent:', token);

        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }

        const response = await axios.get(
          'http://localhost:5001/api/alumni/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // console.log('Profile Data:', response.data); // Debugging
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error.response?.data || error);
      }
    };

    fetchProfile();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to handle input changes
  // const handleChange = (e) => {
  //   setProfile({ ...profile, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Function to handle achievement changes
  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...profile.achievements];
    updatedAchievements[index] = value;
    setProfile({ ...profile, achievements: updatedAchievements });
  };

  // Function to handle profile picture upload
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (field === 'photo') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile({ ...profile, photo: reader.result });
        };
        reader.readAsDataURL(file);
      } else {
        setProfile({ ...profile, [field]: file });
      }
    }
  };

  // Function to save changes
  const handleSave = () => {
    if (profile.password !== profile.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Profile updated successfully!');
    setOpen(false);
  };

  return (
    <Box display="flex" className="container">
      {/* Sidebar */}
      <Box className="sidebar-container">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box component="main" className="main-container">
        <div className="content-wrapper">
          <AppBar position="static" className="appbar">
            <Toolbar>
              <Typography variant="h6" className="title">
                {profile.firstName} {profile.middleName} {profile.lastName}
              </Typography>
              <Box flexGrow={1} />
              {/* <Typography variant="h6" className="status-label">
                QUALIFIED
              </Typography> */}
            </Toolbar>
          </AppBar>

          <Box className="profile-navigation">
            <Button startIcon={<AccountCircle />} className="nav-button">
              MY PROFILE
            </Button>
          </Box>

          <Paper elevation={3} className="content-paper">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              className="profile-tabs"
            >
              <Tab label="Account Information" />
              <Tab label="Personal Information" />
              <Tab label="Educational Information" />
              <Tab label="Employment & Contact" />
            </Tabs>

            {/* Account Information Tab */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" className="section-title">
                Account Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    name="confirmPassword"
                    value={profile.confirmPassword}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Personal Information Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" className="section-title">
                Personal Information
              </Typography>

              <Grid container spacing={3}>
                {/* Personal Details */}
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={getValue(profile.firstName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middleName"
                    value={getValue(profile.middleName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={getValue(profile.lastName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Suffix"
                    name="suffix"
                    value={getValue(profile.suffix)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ID Number"
                    name="idNo"
                    value={getValue(profile.idNo)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Birthday"
                    type="date"
                    name="birthday"
                    value={
                      profile.birthday ? profile.birthday.split('T')[0] : ''
                    }
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Father's Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" className="sub-section-title">
                    Father's Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="fatherFirstName"
                    value={getValue(profile.fatherFirstName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="fatherMiddleName"
                    value={getValue(profile.fatherMiddleName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="fatherLastName"
                    value={getValue(profile.fatherLastName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Suffix"
                    name="fatherSuffix"
                    value={getValue(profile.fatherSuffix)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                {/* Mother's Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" className="sub-section-title">
                    Mother's Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="motherFirstName"
                    value={getValue(profile.motherFirstName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="motherMiddleName"
                    value={getValue(profile.motherMiddleName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="motherLastName"
                    value={getValue(profile.motherLastName)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Suffix"
                    name="motherSuffix"
                    value={getValue(profile.motherSuffix)}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Educational Information Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" className="section-title">
                Educational Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="School/Level"
                    name="school"
                    value={profile.school || ''}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Course/Program"
                    name="program"
                    value={profile.program || ''}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset" className="form-field">
                    <Typography variant="subtitle1">
                      Are you a graduate for the past five years?
                    </Typography>
                    <RadioGroup
                      row
                      name="recentGraduate"
                      value={profile.recentGraduate === 'yes' ? 'yes' : 'no'}
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
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Did you take your Grade School/Elementary in SMU?"
                    helperText="If yes, indicate graduation year, otherwise write NO"
                    name="elementarySMU"
                    value={profile.elementarySMU || ''}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Did you take your Junior High School in SMU?"
                    helperText="If yes, indicate graduation year, otherwise write NO"
                    name="juniorHighSMU"
                    value={profile.juniorHighSMU || ''}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Did you take your Senior High School in SMU?"
                    helperText="If yes, indicate grad year, otherwise write NO"
                    name="seniorHighSMU"
                    value={profile.seniorHighSMU || ''} 
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Strand in SMU"
                    helperText="Enter your strand if applicable"
                    name="strandInSMU"
                    value={profile.strandInSMU || ''}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Did you take your tertiary education in SMU?"
                    helperText="If yes, indicate graduation year, otherwise write NO"
                    name="tertiarySMU"
                    value={
                      profile.tertiarySMU
                        ? `${profile.tertiarySMU} ${
                            profile.yearGraduated
                              ? '- ' + profile.yearGraduated
                              : ''
                          }`
                        : ''
                    }
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Did you study at SMU at any level but did not graduate?"
                    helperText="If yes, indicate year and level last attended, otherwise write N/A"
                    name="nonGraduateSMU"
                    value={profile.nonGraduateSMU || ''}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Employment and Contact Information Tab */}
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" className="section-title">
                Employment and Contact Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className="form-field"
                  >
                    <InputLabel>Employment Status</InputLabel>
                    <Select
                      name="employmentStatus"
                      value={profile.employmentStatus || 'N/A'}
                      onChange={handleChange}
                      label="Employment Status"
                    >
                      <MenuItem value="Employed">Employed</MenuItem>
                      <MenuItem value="Government Employee">
                        Government Employee
                      </MenuItem>
                      <MenuItem value="Private Employee">
                        Private Employee
                      </MenuItem>
                      <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                      <MenuItem value="N/A">N/A</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Currently work"
                    name="currentlyWork"
                    value={profile.currentWork || 'N/A'}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Company Address"
                    name="companyAddress"
                    value={profile.companyAddress || 'N/A'}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={profile.address || 'N/A'}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Facebook Account"
                    name="facebookAccount"
                    value={profile.facebookAccount || 'N/A'}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={profile.contactNumber || 'N/A'}
                    onChange={handleChange}
                    variant="outlined"
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" className="sub-section-title">
                    Top 5 Achievements
                  </Typography>
                </Grid>

                {[0, 1, 2, 3, 4].map((index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                      fullWidth
                      label={`Achievement ${index + 1}`}
                      value={profile.achievements?.[index] || ''}
                      onChange={(e) =>
                        handleAchievementChange(index, e.target.value)
                      }
                      variant="outlined"
                      className="form-field"
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Divider className="section-divider" />
                </Grid>

                {/* Photo Upload */}
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    className="upload-section"
                  >
                    <Typography
                      variant="subtitle1"
                      className="sub-section-title"
                    >
                      Photo
                    </Typography>
                    {profile.photo ? (
                      <Avatar
                        src={profile.photo}
                        className="profile-avatar"
                        sx={{ width: 150, height: 150 }}
                      />
                    ) : (
                      <Avatar
                        className="profile-avatar"
                        sx={{ width: 150, height: 150 }}
                      >
                        <PhotoCamera fontSize="large" />
                      </Avatar>
                    )}
                    <Button
                      variant="contained"
                      component="label"
                      className="upload-button"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photo')}
                      />
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    className="upload-section"
                  >
                    <Typography
                      variant="subtitle1"
                      className="sub-section-title"
                    >
                      Signature
                    </Typography>

                    <Button
                      variant="contained"
                      component="label"
                      className="upload-button"
                    >
                      Upload Signature
                      <input type="file" hidden accept="image/*" />
                    </Button>

                    <Typography variant="subtitle2" mt={2}>
                      Or Sign Below:
                    </Typography>

                    <Box
                      className="signature-box"
                      border={1}
                      borderColor="grey.400"
                      borderRadius={1}
                      height={150}
                      width="100%"
                      mt={1}
                    >
                      <SignatureCanvas
                        ref={null}
                        penColor="black"
                        canvasProps={{
                          width: '100%',
                          height: 150,
                          className: 'sigCanvas',
                        }}
                      />
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mt={1}
                      width="100%"
                    >
                      <Button
                        variant="outlined"
                        className="upload-button"
                        onClick={null}
                      >
                        Clear
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="file-upload-section">
                    <Typography
                      variant="subtitle1"
                      className="sub-section-title"
                    >
                      Curriculum Vitae (Optional)
                    </Typography>
                    <Box
                      className="file-status"
                      border={1}
                      borderColor="grey.400"
                      borderRadius={1}
                      p={2}
                      mb={2}
                    >
                      {profile.curriculumVitae ? (
                        <Typography>
                          {profile.curriculumVitae.fileName}
                        </Typography>
                      ) : (
                        <Typography color="text.secondary">
                          No file uploaded
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      component="label"
                      className="upload-button"
                    >
                      Upload CV
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'curriculumVitae')}
                      />
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="file-upload-section">
                    <Typography
                      variant="subtitle1"
                      className="sub-section-title"
                    >
                      Alumni ID Application (Optional)
                    </Typography>
                    <Box
                      className="file-status"
                      border={1}
                      borderColor="grey.400"
                      borderRadius={1}
                      p={2}
                      mb={2}
                    >
                      {profile.alumniIdApplication ? (
                        <Typography>
                          {profile.alumniIdApplication.name}
                        </Typography>
                      ) : (
                        <Typography color="text.secondary">
                          No file uploaded
                        </Typography>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      component="label"
                      className="upload-button"
                    >
                      Upload Application
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleFileChange(e, 'alumniIdApplication')
                        }
                      />
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              {/* Save Button */}
              <Box mt={4} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setOpen(true)}
                  className="save-profile-button"
                >
                  Save Profile
                </Button>
              </Box>
            </TabPanel>
          </Paper>
        </div>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update your profile?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;
