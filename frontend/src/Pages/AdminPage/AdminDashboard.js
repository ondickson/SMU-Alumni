import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // AppBar,
  // Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  Divider,
  IconButton,
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

const eventStyleGetter = () => ({
  style: {
    backgroundColor: 'transparent',
    border: 'none',
    display: 'none',
  },
  className: 'event-highlight',
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
  const [totals, setTotals] = useState({
    totalAlumni: 0,
    totalJobs: 0,
    totalEvents: 0,
    totalFeedback: 0,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');
  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Fetch data for Total Alumni and Total Jobs
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/alumni/totals');
        const data = await response.json();
        setTotals((prev) => ({
          ...prev,
          totalAlumni: data.totalAlumni,
          totalJobs: data.totalJobs,
        }));
      } catch (error) {
        console.error('Error fetching totals:', error);
      }
    };

    fetchTotals();
  }, []);

  // Fetch data for Total Events
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

        setTotals((prev) => ({
          ...prev,
          totalEvents: data.length,
        }));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch data for Total Feedback
  useEffect(() => {
    const fetchFeedbackCount = async () => {
      try {
        const feedbackResponse = await fetch(
          'http://localhost:5001/api/feedback/unread',
        );
        const feedbackData = await feedbackResponse.json();
        setTotals((prev) => ({
          ...prev,
          totalFeedback: feedbackData.totalUnreadFeedbacks,
        }));
      } catch (error) {
        console.error('Error fetching feedback count:', error);
      }
    };

    fetchFeedbackCount();
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
    const eventsOnDay = events.filter((event) =>
      moment(event.start).isSame(date, 'day'),
    );

    const className =
      eventsOnDay.length > 0
        ? `has-event events-count-${Math.min(eventsOnDay.length, 3)}`
        : '';

    return { className };
  };

  return (
    <div className="admin-dashboard">
      <SidebarMenu />
      <div className="admin-dashboard-content">
        {/* <AppBar position="static" className="admin-dashboard-appbar">
          <Toolbar className="admin-dashboard-toolbar">
            <Typography variant="h6">Admin Dashboard</Typography>
          </Toolbar>
        </AppBar> */}

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
            {
              title: 'Total Unread FeedBacks',
              value: totals.totalFeedback,
              path: '/feedBack',
            },
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
                  onClick={() =>
                    stat.action ? stat.action() : handleNavigate(stat.path)
                  }
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
                <Typography
                  variant="h6"
                  className="admin-dashboard-calendar-title"
                >
                  Calendar
                </Typography>
                <div className="admin-dashboard-calendar-toolbar">
                  <IconButton
                    onClick={() => handleViewChange('month')}
                    color="primary"
                  >
                    <MonthIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleViewChange('week')}
                    color="primary"
                  >
                    <WeekIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleViewChange('agenda')}
                    color="primary"
                  >
                    <AgendaIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleViewChange('day')}
                    color="primary"
                  >
                    <TodayIcon />
                  </IconButton>
                </div>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 300, borderRadius: '8px' }}
                  selectable
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={(slotInfo) => {
                    const clickedDate = slotInfo.start;
                    const eventsOnDay = events.filter((event) =>
                      moment(event.start).isSame(clickedDate, 'day'),
                    );
                    if (eventsOnDay.length > 0) {
                      setSelectedEvent({
                        isMultiEvent: true,
                        date: clickedDate,
                        events: eventsOnDay,
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
                        <IconButton
                          onClick={() => onNavigate('PREV')}
                          sx={{ color: '#ffffff !important' }}
                        >
                          <BackIcon />
                        </IconButton>
                        <Typography variant="h6">{label}</Typography>
                        <IconButton
                          onClick={() => onNavigate('NEXT')}
                          sx={{ color: '#ffffff !important' }}
                        >
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
                <Typography variant="h6">
                  Events on {selectedEvent.date.toDateString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {selectedEvent.events.map((event, index) => (
                  <Box
                    key={index}
                    sx={{ mb: index < selectedEvent.events.length - 1 ? 3 : 0 }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {event.title}
                    </Typography>
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
                    {index < selectedEvent.events.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
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
      </div>
    </div>
  );
}

export default AdminDashboard;
