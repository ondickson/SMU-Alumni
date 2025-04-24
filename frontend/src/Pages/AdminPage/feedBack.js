import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  //   Button,
  Grid,
} from '@mui/material';
import SidebarMenu from '../Sidebar';
import './feedBack.css';

function Feedback() {
  // const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="feedback-container">
      <SidebarMenu className="sidebar" />
      <div className="feedback-main-content">
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Feedback
            </Typography>
          </Toolbar>
        </AppBar>

        <div
          className="feedback"
          style={{ display: 'flex', gap: '10px', margin: '16px 0' }}
        >
          <TextField
            className="searchfield"
            label="Search Feedback"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Grid container spacing={3} className="job-list" />
      </div>
    </div>
  );
}

export default Feedback;
