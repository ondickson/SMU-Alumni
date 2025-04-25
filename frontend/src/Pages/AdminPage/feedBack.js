import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Badge,
  Card,
  CardContent,
  Checkbox,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
// import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
// import MailIcon from '@mui/icons-material/Mail';
import DraftsIcon from '@mui/icons-material/Drafts';
import SidebarMenu from '../Sidebar';
import './feedBack.css';

function Feedback() {
  const [searchTerm, setSearchTerm] = useState('');

  const [isRead, setIsRead] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleToggleRead = () => {
    setIsRead(!isRead);
  };

  return (
    <div className="feedback-container">
      {/* Sidebar */}
      <SidebarMenu className="sidebar" />

      {/* Response Dashboard */}
      <div className="response-dashboard">
        <Box>
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              '.MuiTabs-flexContainer': {
                gap: '4px',
              },
              '.MuiTab-root': {
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                paddingLeft: '12px',
                textTransform: 'none',
                fontSize: '14px',
                minHeight: '32px',
              },
            }}
          >
            <Tab
              icon={<InboxIcon fontSize="small" />}
              iconPosition="start"
              label={
                <span style={{ fontWeight: selectedTab === 0 ? 700 : 500 }}>
                  All Responses
                </span>
              }
            />
            <Tab
              icon={<DraftsIcon fontSize="small" />}
              iconPosition="start"
              label={
                <span style={{ fontWeight: selectedTab === 1 ? 700 : 500 }}>
                  Read
                </span>
              }
            />
            <Tab
              icon={<MarkEmailUnreadIcon fontSize="small" />}
              iconPosition="start"
              label={
                <span style={{ fontWeight: selectedTab === 2 ? 700 : 500 }}>
                  Unread
                </span>
              }
            />
            <Tab
              icon={<DeleteIcon fontSize="small" />}
              iconPosition="start"
              label={
                <span style={{ fontWeight: selectedTab === 3 ? 700 : 500 }}>
                  Bin
                </span>
              }
            />
          </Tabs>
        </Box>
      </div>

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
        <div style={{ marginTop: '12px' }}>
          <Card
            elevation={2}
            style={{
              borderRadius: '12px',
              padding: '8px 12px',
            }}
          >
            <CardContent
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                padding: 0,
                minHeight: '40px',
              }}
              className="feedback-actions"
            >
              {/* Select All Checkbox */}
              <Checkbox size="small" />

              <Tooltip title="Refresh">
                <IconButton>
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Selected">
                <IconButton>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Toggle Read/Unread */}
              <Tooltip title={isRead ? 'Mark as Unread' : 'Mark as Read'}>
                <IconButton onClick={handleToggleRead}>
                  <Badge
                    variant="dot"
                    color="default"
                    invisible={isRead}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {isRead ? (
                      <MarkEmailUnreadIcon fontSize="small" />
                    ) : (
                      <DraftsIcon fontSize="small" />
                    )}
                  </Badge>
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
