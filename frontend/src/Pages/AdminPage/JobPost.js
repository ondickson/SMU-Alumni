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
  const [open, setOpen] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "", link: "", image: null });
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
    setNewJob({ title: "", description: "", link: "", image: null });
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
          <Button variant="outlined" className="post-job-btn" onClick={() => setOpen(true)}>
            Post Job
          </Button>
        </div>

        {/* Job Listings */}
        <Grid container spacing={3} className="job-list">
          {jobPosts
            .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="job-card">
                <CardContent>
                  {job.image && <img src={job.image} alt="Job" className="job-image" />}
                  <Typography variant="h6" className="job-title">{job.title}</Typography>
                  <Typography variant="body2" className="job-description">{job.description}</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    href={job.link} 
                    target="_blank"
                  >
                    View Details
                  </Button>
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
          <TextField fullWidth margin="dense" label="Title" name="title" value={newJob.title} onChange={handleChange} className="input-field" />
          <TextField fullWidth margin="dense" label="Short Description" name="description" multiline rows={2} value={newJob.description} onChange={handleChange} className="input-field" />
          <TextField fullWidth margin="dense" label="Job Link" name="link" value={newJob.link} onChange={handleChange} className="input-field" />
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