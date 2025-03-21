import React, { useState, useEffect } from 'react';
import SidebarMenu from '../Sidebar';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import './JobPost.css';

function JobPost() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    image: null,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // DON'T DELETE THIS (FOR POSTING JOB WITH LINK)
  // const handlePostJob = async () => {
  //   const formDataToSend = new FormData();
  //   formDataToSend.append('title', formData.title);
  //   formDataToSend.append('description', formData.description);
  //   formDataToSend.append('link', formData.link);
  //   if (formData.image) {
  //     formDataToSend.append('image', formData.image);
  //   }

  //   try {
  //     await axios.post('http://localhost:5001/api/jobs', formDataToSend, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     setOpen(false);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error adding job:', error);
  //   }
  // };

// DON'T DELETE THIS (FOR POSTING JOB WITH FILE)
  const handlePostJob = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("link", formData.link);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
  
    try {
      await axios.post("http://localhost:5001/api/jobs", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };
  

  return (
    <div className="job-container">
      <SidebarMenu className="sidebar" />
      <div className="job-main-content">
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Job Posting
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="job" style={{ display: 'flex', gap: '10px' }}>
          <TextField
            className="searchfield"
            label="Search Job"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="outlined"
            className="post-job-btn"
            onClick={() => setOpen(true)}
          >
            Post Job
          </Button>
        </div>

        <Grid container spacing={3} className="job-list">
          {jobs
            .filter((job) =>
              job.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="job-card">
                  <CardContent>
                    {/* // DON'T DELETE THIS (FOR POSTING JOB WITH LINK) */}
                    {/* <img
                      src={job.image || 'https://via.placeholder.com/300'}
                      alt="Job"
                      className="job-image"
                    /> */}

                    {/* // DON'T DELETE THIS (FOR POSTING JOB WITH FILE) */}
                    <img
                      src={
                        job.image
                          ? `data:image/png;base64,${job.image}`
                          : 'https://via.placeholder.com/300'
                      }
                      alt="Job"
                      className="job-image"
                    />

                    <Typography variant="h6" className="job-title">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" className="job-description">
                      {job.description}
                    </Typography>
                    <Typography variant="body2" className="job-link">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Job Link
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">Post a New Job</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            name="title"
            fullWidth
            margin="dense"
            label="Title"
            className="input-field"
            onChange={handleChange}
          />
          <TextField
            name="description"
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            className="input-field"
            onChange={handleChange}
          />
          <TextField
            name="link"
            fullWidth
            margin="dense"
            label="Insert Link Here"
            className="input-field"
            onChange={handleChange}
          />
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            className="post-job-btn"
            onClick={handlePostJob}
          >
            Post Job
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobPost;
