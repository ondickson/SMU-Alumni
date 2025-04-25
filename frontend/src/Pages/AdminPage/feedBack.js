import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Modal,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarMenu from '../Sidebar';
import './feedBack.css';

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);
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
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleRowClick = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDialog(true);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto',
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFeedback(null);
  };

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {filteredFeedbacks.length > 0 ? (
          <div
            className="feedback-table"
            style={{
              maxHeight: '70vh',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {filteredFeedbacks.map((fb) => (
                  <tr
                    key={fb._id}
                    className="feedback-row"
                    onClick={() => handleRowClick(fb)}
                    style={{ cursor: 'pointer' }}
                  >
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

      {/* Individual Feedback Form Details Modal */}
      <Modal
        open={openDialog} // <-- this makes it work!
        onClose={handleCloseDialog}
        aria-labelledby="feedback-form-details-modal-title"
      >
        <Box sx={modalStyle}>
          {selectedFeedback && (
            <>
              <DialogTitle
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  background: '#272974',
                  color: 'white',
                }}
              >
                Feedback Submission Details
              </DialogTitle>

              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedFeedback.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Submitted on: {formatTimeAgo(selectedFeedback.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email: {selectedFeedback.email || 'N/A'}
                </Typography>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Areas of Involvement
                </Typography>

                {selectedFeedback.academic?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      Academic:
                    </Typography>
                    <List dense>
                      {selectedFeedback.academic.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {selectedFeedback.administrative?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      Administrative:
                    </Typography>
                    <List dense>
                      {selectedFeedback.administrative.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {selectedFeedback.finance?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      Finance/Development:
                    </Typography>
                    <List dense>
                      {selectedFeedback.finance.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${item}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Paper>

              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Important Things Learned at SMU:
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedFeedback.importantThings || 'N/A'}
                </Typography>

                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Suggestions for Improvement:
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedFeedback.suggestions || 'N/A'}
                </Typography>

                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Alumni Contacts:
                </Typography>
                <Typography variant="body2">
                  {selectedFeedback.alumniList || 'N/A'}
                </Typography>
              </Paper>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Feedback;
