import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Modal,
  Checkbox,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
} from '@mui/material';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import DownloadIcon from '@mui/icons-material/Download';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

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
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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

  const visibleFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch =
      fb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'all') return fb.status !== 'deleted';
    if (activeTab === 'deleted') return fb.status === 'deleted';
    return fb.status === activeTab;
  });

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

  const handleCloseDialog = async () => {
    if (selectedFeedback?.status === 'unread') {
      try {
        const res = await fetch(
          `http://localhost:5001/api/feedback/${selectedFeedback._id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'read' }),
          },
        );
        const updated = await res.json();
        setFeedbacks((prev) =>
          prev.map((fb) => (fb._id === updated._id ? updated : fb)),
        );
      } catch (err) {
        console.error('Failed to update feedback status to read:', err);
      }
    }
    setOpenDialog(false);
    setSelectedFeedback(null);
  };

  const handleSelectFeedback = (feedbackId) => {
    setSelectedFeedbackIds((prev) =>
      prev.includes(feedbackId)
        ? prev.filter((id) => id !== feedbackId)
        : [...prev, feedbackId],
    );
  };

  const handleMarkAsRead = () => {
    updateFeedbackStatus('read');
  };

  const handleMarkAsUnread = () => {
    updateFeedbackStatus('unread');
  };

  const handleMarkAsDeleted = () => {
    updateFeedbackStatus('deleted');
  };

  const handleSelectAll = () => {
    if (selectedFeedbackIds.length === visibleFeedbacks.length) {
      setSelectedFeedbackIds([]);
    } else {
      setSelectedFeedbackIds(visibleFeedbacks.map((fb) => fb._id));
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing feedback list');
    window.location.reload();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const updateFeedbackStatus = async (status) => {
    try {
      const updates = await Promise.all(
        selectedFeedbackIds.map(async (id) => {
          const res = await fetch(`http://localhost:5001/api/feedback/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status,
              deletedAt: status === 'deleted' ? new Date().toISOString() : null,
            }),
          });
          return res.json();
        }),
      );

      // Merge updated feedbacks into state
      setFeedbacks((prev) =>
        prev.map((fb) => {
          const updated = updates.find((u) => u._id === fb._id);
          return updated ? updated : fb;
        }),
      );

      setSelectedFeedbackIds([]); // Clear selection
    } catch (err) {
      console.error('Error updating feedback status:', err);
    }
  };

  // Download Table to CSV
  const downloadCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Alumni ID',
      'Academic',
      'Administrative',
      'Finance',
      'Important Things',
      'Suggestions',
      'Alumni List',
      'Status',
      'Created At',
      'Deleted At',
    ];

    const rows = feedbacks.map((fb) => [
      fb.name || '',
      fb.email || '',
      fb.alumniId || '',
      (fb.academic || []).join('; '),
      (fb.administrative || []).join('; '),
      (fb.finance || []).join('; '),
      fb.importantThings || '',
      fb.suggestions || '',
      fb.alumniList || '',
      fb.status || '',
      new Date(fb.createdAt).toLocaleString(),
      fb.deletedAt ? new Date(fb.deletedAt).toLocaleString() : '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `feedback_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="feedback-container">
      <SidebarMenu className="sidebar" />

      <div className="feedback-main-content">
        <div
          className="feedback"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '16px 0',
          }}
        >
          {/* Left: Search + Tabs */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="All" value="all" />
              <Tab label="Unread" value="unread" />
              <Tab label="Read" value="read" />
              <Tab label="Deleted" value="deleted" />
            </Tabs>
          </div>

          {/* Right: Download CSV Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={downloadCSV}
          >
            Download CSV
          </Button>
        </div>

        <div className="icons-action-buttons">
          <div
            className="action-buttons"
            style={{ marginBottom: '10px', fontSize: 'small' }}
          >
            {/* Select All Checkbox */}
            <Tooltip title="Select all feedback" arrow>
              <IconButton>
                <Checkbox
                  checked={
                    selectedFeedbackIds.length === visibleFeedbacks.length
                  }
                  onChange={handleSelectAll}
                  size="small"
                />
              </IconButton>
            </Tooltip>

            {/* Mark as Read Button */}
            <Tooltip title="Mark as read" arrow>
              <IconButton
                onClick={handleMarkAsRead}
                disabled={selectedFeedbackIds.length === 0}
                color="primary"
              >
                <DraftsIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Mark as Unread Button */}
            <Tooltip title="Mark as unread" arrow>
              <IconButton
                onClick={handleMarkAsUnread}
                disabled={selectedFeedbackIds.length === 0}
                color="primary"
                style={{ marginLeft: '10px' }}
              >
                <MarkEmailUnreadIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Mark as Deleted Button */}
            <Tooltip title="Mark as deleted" arrow>
              <IconButton
                onClick={handleMarkAsDeleted}
                disabled={selectedFeedbackIds.length === 0}
                color="secondary"
                style={{ marginLeft: '10px' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Refresh Button */}
            <Tooltip title="Refresh feedback list" arrow>
              <IconButton
                onClick={handleRefresh}
                color="default"
                style={{ marginLeft: '10px' }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {visibleFeedbacks.length > 0 ? (
          <div
            className="feedback-table"
            style={{
              maxHeight: '75vh',
              overflowY: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {visibleFeedbacks.map((fb) => (
                  <tr
                    key={fb._id}
                    className="feedback-row"
                    onClick={() => handleRowClick(fb)}
                    style={{
                      cursor: 'pointer',
                      fontWeight: fb.status === 'unread' ? 'bold' : 'normal',
                    }}
                  >
                    <td>
                      <Checkbox
                        checked={selectedFeedbackIds.includes(fb._id)}
                        onChange={() => handleSelectFeedback(fb._id)}
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                      />
                    </td>
                    <td className="column name">{fb.name}</td>

                    <td className="column preview">
                      {fb.importantThings?.split(' ').slice(0, 15).join(' ')}...
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
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="textSecondary">
              No feedback available
            </Typography>
          </Box>
        )}
      </div>

      {/* Individual Feedback Form Details Modal */}
      <Modal
        open={openDialog}
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
