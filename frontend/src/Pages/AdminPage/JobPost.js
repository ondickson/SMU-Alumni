import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobPost.css";
import SidebarMenu from "../Sidebar";
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
} from "@mui/material";

function JobPost() {
  const [open, setOpen] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "", salary: "", location: "", image: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/api/jobs") 
      .then(response => setJobPosts(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:5001/api/jobs?search=${searchTerm}`)
      .then(response => setJobPosts(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, [searchTerm]);
  
  

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5001/api/jobs", newJob) 
      .then(response => {
        setJobPosts([...jobPosts, response.data]);
        setNewJob({ title: "", description: "", salary: "", location: "", image: "" });
        setOpen(false);
      })
      .catch(error => console.error("Error posting job:", error));
  };

  return (
    <div className="job-container">
      <SidebarMenu className="sidebar" />
      <div className="job-main-content">
      
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">Job Posting</Typography>
          </Toolbar>
        </AppBar>

        {/* Search Field & Post Job Button */}
        <div className="job-actions">
          <TextField
            className="search-input"
            label="Search Job"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outlined" className="search-btn">
            Search
          </Button>
          <Button variant="outlined" className="post-job-btn" onClick={() => setOpen(true)}>
            Post Job
          </Button>
        </div>

        {/* Job Listings */}
        <Grid container spacing={3} className="job-list">
          {jobPosts.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="job-card">
                <CardContent>
                  {job.image && <img src={job.image} alt="Job" className="job-image" />}
                  <Typography variant="h6" className="job-title">{job.title}</Typography>
                  <Typography variant="body1" className="job-salary"><strong>Salary:</strong> {job.salary}</Typography>
                  <Typography variant="body1" className="job-location"><strong>Location:</strong> {job.location}</Typography>
                  <Typography variant="body2" className="job-description">{job.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Post Job Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">Post a New Job</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField fullWidth margin="dense" label="Job Title" name="title" value={newJob.title} onChange={handleChange} className="input-field" />
          <TextField fullWidth margin="dense" label="Job Description" name="description" multiline rows={3} value={newJob.description} onChange={handleChange} className="input-field" />
          <TextField fullWidth margin="dense" label="Salary" name="salary" value={newJob.salary} onChange={handleChange} className="input-field" />
          <TextField fullWidth margin="dense" label="Location" name="location" value={newJob.location} onChange={handleChange} className="input-field" />
          <TextField fullWidth margin="dense" label="Image URL" name="image" value={newJob.image} onChange={handleChange} className="input-field" />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" className="post-job-btn">Post Job</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobPost;
