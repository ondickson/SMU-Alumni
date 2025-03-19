import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Modal,
  IconButton,
} from '@mui/material';
import {
  Calendar,
  momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SidebarMenu from '../Sidebar';
import {
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  CalendarMonth as MonthIcon,
  ViewWeek as WeekIcon,
  Event as AgendaIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import './AlumniDashboard.css';

const localizer = momentLocalizer(moment);
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

// Custom blue color as specified
const customBlue = '#272974';

function AlumniDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/events');
        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
          location: event.location,
          description: event.description,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarMenu />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          py: 4,
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
        }}
      >
        {/* Header Section */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            textAlign: 'center',
            background: customBlue,
            color: '#ffffff',
            borderRadius: 3,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Alumni Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ opacity: 0.9 }}>
            Welcome to the alumni dashboard! Connect with fellow alumni, explore
            opportunities, and manage your profile.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#ffffff',
              color: customBlue,
              '&:hover': { backgroundColor: '#f0f0f0' },
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>

        {/* Calendar Section */}
        <Grid container spacing={3} sx={{ mt: 4, maxWidth: '900px' }}>
          <Grid item xs={12}>
            <Card className="alumni-dashboard-calendar-card">
              <CardContent>
                <Typography variant="h6" className="alumni-dashboard-calendar-title">
                  Alumni Events Calendar
                </Typography>
                <div className="alumni-dashboard-calendar-toolbar">
                  <IconButton onClick={() => handleViewChange('month')} sx={{ color: '#ffffff' }}>
                    <MonthIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewChange('week')} sx={{ color: '#ffffff' }}>
                    <WeekIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewChange('agenda')} sx={{ color: '#ffffff' }}>
                    <AgendaIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewChange('day')} sx={{ color: '#ffffff' }}>
                    <TodayIcon />
                  </IconButton>
                </div>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500, borderRadius: '8px' }}
                  selectable
                  onSelectEvent={handleSelectEvent}
                  view={view}
                  onView={setView}
                  components={{
                    toolbar: ({ label, onNavigate }) => (
                      <div className="alumni-dashboard-calendar-toolbar">
                        <IconButton onClick={() => onNavigate('PREV')} sx={{ color: '#ffffff' }}>
                          <BackIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ color: '#ffffff' }}>{label}</Typography>
                        <IconButton onClick={() => onNavigate('NEXT')} sx={{ color: '#ffffff' }}>
                          <NextIcon />
                        </IconButton>
                      </div>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Event Details Modal */}
        <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <Box sx={modalStyle}>
            <Typography variant="h6">{selectedEvent?.title}</Typography>
            <Typography>
              <strong>Date:</strong> {selectedEvent?.start.toDateString()}
            </Typography>
            <Typography>
              <strong>Location:</strong> {selectedEvent?.location}
            </Typography>
            <Typography>
              <strong>Description:</strong> {selectedEvent?.description}
            </Typography>
            <Button
              onClick={() => setSelectedEvent(null)}
              variant="contained"
              sx={{ 
                mt: 2,
                backgroundColor: customBlue,
                '&:hover': { backgroundColor: '#3a3c8f' }
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default AlumniDashboard;