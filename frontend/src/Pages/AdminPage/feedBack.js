import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  // Card,
  // CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarMenu from '../Sidebar';
import './feedBack.css';

// Utility to format date like Gmail
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);
  // const diffWeeks = Math.floor(diffDays / 7);
  const diffYears = now.getFullYear() - date.getFullYear();

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffYears === 0)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  return date.toLocaleDateString();
};

function Feedback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/feedback');
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error('Failed to fetch feedback:', err);
      }
    };

    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      fb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="feedback-container">
      {/* Sidebar */}
      <SidebarMenu className="sidebar" />

      {/* Main Content */}
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
          {/* Search Field */}
          <TextField
            className="searchfield"
            label="Search Feedback"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Card */}
        {filteredFeedbacks.length > 0 ? (
          <div className="feedback-table">
            <table>
              {/* <thead>
                <tr>
                  <th className="column name">Name</th>
                  <th className="column email">Email</th>
                  <th className="column preview">Important Things</th>
                  <th className="column time">Date/Time</th>
                </tr>
              </thead> */}
              <tbody>
                {filteredFeedbacks.map((fb) => (
                  <tr key={fb._id} className="feedback-row">
                    <td className="column name">{fb.name}</td>
                    <td className="column email">{fb.email}</td>
                    <td className="column preview">
                      {fb.importantThings?.split(' ').slice(0, 10).join(' ')}...
                    </td>
                    <td className="column time">
                      {formatTimeAgo(fb.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            No feedback found.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Feedback;
