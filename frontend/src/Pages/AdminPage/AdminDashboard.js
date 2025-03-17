import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tooltip,
  Modal,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  DialogTitle,
} from '@mui/material';
import {
  Today as TodayIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  CalendarMonth as MonthIcon,
  ViewWeek as WeekIcon,
  Event as AgendaIcon,
} from '@mui/icons-material';
import SidebarMenu from '../Sidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminDashboard.css';

// const sidebarWidth = 250;
const barChartData = [
  { month: 'Jan', events: 5000 },
  { month: 'Feb', events: 7000 },
  { month: 'Mar', events: 4000 },
  { month: 'Apr', events: 6000 },
  { month: 'May', events: 6500 },
  { month: 'Jun', events: 7100 },
];

const localizer = momentLocalizer(moment);

// Simple survey feedback data
const surveyData = [
  {
    question: 'How satisfied are you with the alumni portal?',
    averageRating: 4.2,
    responses: 47,
  },
  {
    question: 'How would you rate the job posting features?',
    averageRating: 3.8,
    responses: 35,
  },
  {
    question: 'Rate the effectiveness of our networking events',
    averageRating: 4.5,
    responses: 42,
  },
  {
    question: 'How likely are you to recommend our portal to other alumni?',
    averageRating: 4.3,
    responses: 46,
  },
];

// Client suggestions and observations
const clientFeedback = [
  {
    name: 'John Doe',
    suggestion:
      'Would be great to have more frequent industry-specific networking events.',
    date: '2025-03-02',
  },
  {
    name: 'Sarah Smith',
    suggestion:
      'The job notification system could be improved to filter by industry and experience level.',
    date: '2025-02-28',
  },
  {
    name: 'Mike Johnson',
    suggestion:
      'Consider adding a mentorship matching feature for recent graduates.',
    date: '2025-03-10',
  },
];

const eventStyleGetter = () => ({
  style: {
    backgroundColor: '#272974',
    color: 'white',
    borderRadius: '4px',
    padding: '5px',
  },
});

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

function AdminDashboard() {
  const navigate = useNavigate();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [totals, setTotals] = useState({
    totalAlumni: 0,
    totalJobs: 0,
    totalEvents: 0,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month'); 
  const handleViewChange = (newView) => {
    setView(newView);
  };
  

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/admin/totals');
        const data = await response.json();
        // console.log('Fetched totals:', data);
        setTotals(data);
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, []);

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

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const [events, setEvents] = useState([
    {
      title: 'Alumni Meetup',
      start: new Date(2025, 3, 15),
      end: new Date(2025, 3, 15),
    },
    {
      title: 'Career Fair',
      start: new Date(2025, 5, 10),
      end: new Date(2025, 5, 10),
    },
  ]);


  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';

    return stars;
  };

  return (
    <div className="admin-dashboard">
      <SidebarMenu />
      <div className="admin-dashboard-content">
        <AppBar position="static" className="admin-dashboard-appbar">
          <Toolbar className="admin-dashboard-toolbar">
            <Typography variant="h6">Admin Dashboard</Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {[
            {
              title: 'Upcoming Events',
              value: totals.totalEvents,
              path: '/EventPage',
            },
            { title: 'Open Jobs', value: totals.totalJobs, path: '/JobPost' },
            {
              title: 'Total Alumni Registered',
              value: totals.totalAlumni,
              path: '/AlumniInformation',
            },
            { title: 'FeedBacks', value: '2', path: '/AlumniInformation' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="admin-dashboard-card">
                <Typography variant="h5" className="admin-dashboard-card-title">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.title}
                </Typography>
                {stat.path ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="admin-dashboard-card-button"
                    onClick={() => handleNavigate(stat.path)}
                  >
                    View Details
                  </Button>
                ) : null}
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={8}>
            <Card className="admin-dashboard-overview">
              <CardContent>
                <Typography
                  variant="h6"
                  className="admin-dashboard-overview-title"
                >
                  Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartTooltip />
                    <Bar
                      dataKey="events"
                      fill="#272974"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="admin-dashboard-overview-button"
              >
                More Insights
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="admin-dashboard-calendar-card">
              <CardContent>
                <Typography variant="h6" className="admin-dashboard-calendar-title">
                  Calendar
                </Typography>
                <div className="admin-dashboard-calendar-toolbar">
                  <IconButton onClick={() => handleViewChange('month')} color="primary">
                    <MonthIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewChange('week')} color="primary">
                    <WeekIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewChange('agenda')} color="primary">
                    <AgendaIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewChange('day')} color="primary">
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
                  eventPropGetter={eventStyleGetter}
                  view={view}
                  onView={setView}
                  components={{
                    toolbar: ({ label, onNavigate }) => (
                      <div className="admin-dashboard-calendar-toolbar">
                        <IconButton onClick={() => onNavigate('PREV')}>
                          <BackIcon />
                        </IconButton>
                        <Typography variant="h6">{label}</Typography>
                        <IconButton onClick={() => onNavigate('NEXT')}>
                          <NextIcon />
                        </IconButton>
                      </div>
                    ),
                    event: ({ event }) => (
                      <Tooltip title={event.description} arrow>
                        <div>{event.title}</div>
                      </Tooltip>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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
            <Button onClick={() => setSelectedEvent(null)}>Close</Button>
          </Box>
        </Modal>

        {/* Simple Feedback Survey Modal */}
        <Modal
          open={feedbackModalOpen}
          onClose={() => setFeedbackModalOpen(false)}
          aria-labelledby="feedback-modal-title"
        >
          <Box sx={modalStyle}>
            <DialogTitle
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                background: '#272974',
                color: 'white',
              }}
            >
              Client Survey Results
            </DialogTitle>

            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Survey Questions & Ratings (1-5 Scale)
              </Typography>

              <List>
                {surveyData.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={item.question}
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ color: '#272974', fontWeight: 'bold' }}
                              >
                                {renderStars(item.averageRating)} (
                                {item.averageRating}/5)
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.responses} responses
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < surveyData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Client Suggestions & Observations
              </Typography>

              <List>
                {clientFeedback.map((feedback, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 'bold' }}
                            >
                              {feedback.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feedback.date}
                            </Typography>
                          </Box>
                        }
                        secondary={feedback.suggestion}
                      />
                    </ListItem>
                    {index < clientFeedback.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                onClick={() => setFeedbackModalOpen(false)}
                variant="contained"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;
