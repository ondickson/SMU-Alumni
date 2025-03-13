import React, { useState } from "react";
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
import "./JobPost.css";

function JobPost() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const jobPosts = [
    {
      image: "https://via.placeholder.com/300", // Replace with actual image URL
      title: "Software Engineer",
      description: "Looking for a skilled React developer to join our team.",
      link: "https://example.com",
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Graphic Designer",
      description: "Seeking a creative designer for branding projects.",
      link: "https://example.com",
    },
    {
      image: "https://via.placeholder.com/300",
      title: "Marketing Specialist",
      description: "Join our digital marketing team for exciting campaigns.",
      link: "https://example.com",
    },
  ];

  return (
    <div className="job-container">
      <SidebarMenu className="sidebar" />
      <div className="job-main-content">
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">Job Posting</Typography>
          </Toolbar>
        </AppBar>

        <div className="job" style={{ display: "flex", gap: "10px" }}>
          <TextField
            className="searchfield"
            label="Search Job"
            variant="outlined"
            size="small"
          />
          <Button variant="outlined" className="post-job-btn" onClick={() => setOpen(true)}>
            Post Job
          </Button>
        </div>


        <Grid container spacing={3} className="job-list">
          {jobPosts.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="job-card">
                <CardContent>
                  <img src={job.image} alt="Job" className="job-image" />
                  <Typography variant="h6" className="job-title">{job.title}</Typography>
                  <Typography variant="body2" className="job-description">{job.description}</Typography>
                  <br />
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-link">
                    Apply Now
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">Post a New Job</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField fullWidth margin="dense" label="Title" className="input-field" />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} className="input-field" />
          <TextField fullWidth margin="dense" label="Insert Link Here" className="input-field" />
          <input type="file" className="file-input" />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" className="post-job-btn">Post Job</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JobPost;