import React, { useState, useEffect } from 'react';
import SidebarMenu from '../Sidebar';
import {
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
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import './JobPost.css';

function JobPost() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handlePostJob = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.post('http://localhost:5001/api/jobs', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // Edit Job Handler
  const handleEditJob = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);
    setFormData({
      title: job.title,
      description: job.description,
      link: job.link,
      image: job.image || null,
    });
    setSelectedJobId(jobId);
    setEditMode(true);
    setOpen(true);
  };

  const handleUpdateJob = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.put(
        `http://localhost:5001/api/jobs/${selectedJobId}`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  // Open Confirm Delete Dialog
  const handleDeleteDialogOpen = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteDialogOpen(true);
  };

  // Delete Job Handler
  const handleDeleteJob = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/jobs/${selectedJobId}`);
      setDeleteDialogOpen(false);
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="job-container">
      <SidebarMenu className="sidebar" />
      <div className="job-main-content">
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
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                link: '',
                image: null,
              });
              setEditMode(false);
              setSelectedJobId(null);
              setOpen(true);
            }}
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
                    <div
                      className="icon-container"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      <Edit
                        className="icon-hover"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEditJob(job._id)}
                        color="primary"
                      />
                      <Delete
                        className="icon-hover"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteDialogOpen(job._id)}
                        color="error"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>

      {/* Confirm Delete Job Dialog Box */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle className="dialog-title">Delete Job</DialogTitle>
        <DialogContent className="dialog-content">
          Are you sure you want to delete this job?
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteJob}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">
          {editMode ? 'Edit Job' : 'Post a New Job'}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            name="title"
            fullWidth
            margin="dense"
            label="Title"
            value={formData.title}
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
            value={formData.description}
            className="input-field"
            onChange={handleChange}
          />
          <TextField
            name="link"
            fullWidth
            margin="dense"
            label="Insert Link Here"
            value={formData.link}
            className="input-field"
            onChange={handleChange}
          />
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
          {formData.image && typeof formData.image === 'string' && (
            <img
              src={`data:image/png;base64,${formData.image}`}
              alt="Current"
              style={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '10px' }}
            />
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            className="post-job-btn"
            onClick={editMode ? handleUpdateJob : handlePostJob}
          >
            {editMode ? 'Update Job' : 'Post Job'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobPost;
