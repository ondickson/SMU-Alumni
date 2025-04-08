import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "../Sidebar";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import "./Jobs.css";

function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="jobs-container">
      <SidebarMenu className="jobs-sidebar" />
      <div className="jobs-main-content">
        <AppBar position="static" className="jobs-appbar">
          <Toolbar>
            <Typography variant="h6" className="jobs-title">
              Job Listings
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="jobs-search">
          <TextField
            className="jobs-searchfield"
            label="Search Job"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Grid container spacing={3} className="jobs-list">
          {jobs
            .filter((job) =>
              job.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="jobs-card">
                  <CardContent>
                    <img
                      src={
                        job.image
                          ? `data:image/png;base64,${job.image}`
                          : "https://via.placeholder.com/300"
                      }
                      alt="Job"
                      className="jobs-image"
                    />
                    <Typography variant="h6" className="jobs-title-text">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" className="jobs-description">
                      {job.description}
                    </Typography>
                    <Typography variant="body2" className="jobs-link">
                      <a href={job.link} target="_blank" rel="noopener noreferrer">
                        Open Job Link
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default Jobs;