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
  Modal,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  DialogTitle,
  // TextField,
  // Checkbox,
  // FormControlLabel,
  // FormGroup,
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

// Recent alumni feedback form submissions
const recentFeedbackSubmissions = [
  {
    name: 'Alex Thompson',
    academic: ['Voluntary Consultancy Service', 'Curriculum Development/enrichment'],
    administrative: ['Assist in the formation of plans, programs, projects of the alumni'],
    finance: ['Assist in the development programs of the university', 'Outreach Program'],
    importantThings: 'The critical thinking skills and communication techniques learned at SMU have been invaluable in my career.',
    suggestions: 'Consider adding more industry partnerships for internships before graduation.',
    alumniList: 'Maria Garcia (maria@example.com), Chris Wong (chris.wong@company.org)',
    employmentAddress: 'Tech Innovations Inc., 123 Business Park, Seattle, WA',
    submittedOn: '2025-03-15'
  },
  {
    name: 'Priya Patel',
    academic: ['Volunteer Guest Lecture in the University', 'Volunteer Researcher of the University'],
    administrative: ['Assist in appraising institutional objectives in relation to community services'],
    finance: ['Environmental Concerns', 'Assist in generating resources for the realization of the objectives of the alumni affairs'],
    importantThings: 'SMU taught me the importance of ethical leadership and diverse perspectives in decision-making.',
    suggestions: 'The online library resources could be expanded to better serve remote alumni.',
    alumniList: 'James Lee (jameslee@gmail.com), Sophia Chen (sophia.c@outlook.com)',
    employmentAddress: 'Healthcare Solutions Group, 456 Medical Plaza, Boston, MA',
    submittedOn: '2025-03-12'
  }
];

const eventStyleGetter = () => ({
  style: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'none'
  },
  className: 'event-highlight'
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
  const [feedbackFormModalOpen, setFeedbackFormModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
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
        const response = await fetch('http://localhost:5001/api/alumni/totals');
        const data = await response.json();
        // console.log('Fetched totals:', data);
  
        setTotals((prev) => ({
          ...prev, // Keep existing values
          totalAlumni: data.totalAlumni,
          totalJobs: data.totalJobs, 
          // Do NOT update totalEvents here, let fetchEvents handle it
        }));
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
        // console.log("Fetched events:", data.length);

        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
          location: event.location,
          description: event.description,
        }));
        setEvents(formattedEvents);

        setTotals((prev) => ({
          ...prev,
          totalEvents: data.length, // Ensure it's set correctly
        }));
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
  
  const dayPropGetter = (date) => {
    const eventsOnDay = events.filter(event => 
      moment(event.start).isSame(date, 'day')
    );
  
    const className = eventsOnDay.length > 0 
      ? `has-event events-count-${Math.min(eventsOnDay.length, 3)}` 
      : '';
  
    return { className };
  };

  // Function to render stars based on rating
  // const renderStars = (rating) => {
  //   const fullStars = Math.floor(rating);
  //   const hasHalfStar = rating - fullStars >= 0.5;

  //   let stars = '★'.repeat(fullStars);
  //   if (hasHalfStar) stars += '☆';

  //   return stars;
  // };
  
  // Handle feedback form details view
  const handleViewFeedbackDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackFormModalOpen(true);
  };

  // useEffect(() => {
  //   console.log("Updated events state:", events.length); // Ensure all events are stored
  // }, [events]);
  
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
            { title: 'FeedBacks', value: recentFeedbackSubmissions.length, action: () => setFeedbackModalOpen(true) },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="admin-dashboard-card">
                <Typography variant="h5" className="admin-dashboard-card-title">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="admin-dashboard-card-button"
                  onClick={() => stat.action ? stat.action() : handleNavigate(stat.path)}
                >
                  View Details
                </Button>
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
                  onSelectSlot={(slotInfo) => {
                    const clickedDate = slotInfo.start;
                    const eventsOnDay = events.filter(event => 
                      moment(event.start).isSame(clickedDate, 'day')
                    );
                    if (eventsOnDay.length > 0) {
                      // Instead of just taking the first event, set a custom object with all events
                      setSelectedEvent({
                        isMultiEvent: true,
                        date: clickedDate,
                        events: eventsOnDay
                      });
                    }
                  }}
                  eventPropGetter={eventStyleGetter}
                  dayPropGetter={dayPropGetter}
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
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <Box sx={modalStyle}>
            {selectedEvent?.isMultiEvent ? (
              <>
                <Typography variant="h6">Events on {selectedEvent.date.toDateString()}</Typography>
                <Divider sx={{ my: 2 }} />
                {selectedEvent.events.map((event, index) => (
                  <Box key={index} sx={{ mb: index < selectedEvent.events.length - 1 ? 3 : 0 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{event.title}</Typography>
                    {event.location && (
                      <Typography>
                        <strong>Location:</strong> {event.location}
                      </Typography>
                    )}
                    {event.description && (
                      <Typography>
                        <strong>Description:</strong> {event.description}
                      </Typography>
                    )}
                    {index < selectedEvent.events.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </>
            ) : (
              <>
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
              </>
            )}
            <Button 
              onClick={() => setSelectedEvent(null)}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
        
        {/* Feedback Survey Modal */}
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
              Alumni Feedback Data
            </DialogTitle>

            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
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

            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Feedback Form Submissions
              </Typography>

              <List>
                {recentFeedbackSubmissions.map((feedback, index) => (
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
                              {feedback.submittedOn}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Employment: {feedback.employmentAddress}
                            </Typography>
                            <Button 
                              size="small" 
                              color="primary" 
                              onClick={() => handleViewFeedbackDetails(feedback)}
                              sx={{ mt: 1 }}
                            >
                              View Full Details
                            </Button>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentFeedbackSubmissions.length - 1 && <Divider />}
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

        {/* Individual Feedback Form Details Modal */}
        <Modal
          open={feedbackFormModalOpen}
          onClose={() => setFeedbackFormModalOpen(false)}
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
                    Submitted on: {selectedFeedback.submittedOn}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Employment: {selectedFeedback.employmentAddress}
                  </Typography>
                </Paper>

                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Areas of Involvement
                  </Typography>

                  {selectedFeedback.academic.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
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

                  {selectedFeedback.administrative.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
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

                  {selectedFeedback.finance.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
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
                  <Typography variant="subtitle1" gutterBottom>
                    Important Things Learned at SMU:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedFeedback.importantThings}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    Suggestions for Improvement:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {selectedFeedback.suggestions}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom>
                    Alumni Contacts:
                  </Typography>
                  <Typography variant="body2">
                    {selectedFeedback.alumniList}
                  </Typography>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    onClick={() => setFeedbackFormModalOpen(false)}
                    variant="contained"
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;