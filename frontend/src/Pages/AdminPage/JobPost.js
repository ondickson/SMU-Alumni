import React, { useState } from "react";
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
  const exampleJobs = [
    {
      title: "Software Engineer",
      description: "Develop and maintain software applications.",
      salary: "$80,000 - $120,000",
      location: "New York, NY",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Graphic Designer",
      description: "Create visual concepts for marketing and branding.",
      salary: "$50,000 - $70,000",
      location: "Los Angeles, CA",
      image: "https://via.placeholder.com/150",
    },
  ];

  const [open, setOpen] = useState(false);
  const [jobPosts, setJobPosts] = useState(exampleJobs);
  const [newJob, setNewJob] = useState({ title: "", description: "", salary: "", location: "", image: null });
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewJob({ ...newJob, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    setJobPosts([...jobPosts, newJob]);
    setNewJob({ title: "", description: "", salary: "", location: "", image: null });
    setOpen(false);
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
          <input type="file" onChange={handleImageChange} className="file-input" />
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
