import React, { useState } from 'react';
import './Events.css';
import Sidebar from '../Sidebar';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';

// Static sample events data
const sampleEvents = [
  {
    _id: '1',
    title: 'Annual Alumni Homecoming',
    date: '2025-04-25T18:00:00',
    location: 'University Main Campus',
    description: 'Join us for our biggest alumni gathering of the year!',
    image: '/Annual Alumni Homecoming.jpg'
  },
  {
    _id: '2',
    title: 'Career Networking Night',
    date: '2025-04-10T17:30:00',
    location: 'University Business Center',
    description: 'Connect with fellow alumni across various industries.',
    image: '/Career Networking Night.jpg'
  },
  {
    _id: '3',
    title: 'Tech Innovation Summit',
    date: '2025-05-15T09:00:00',
    location: 'Tech Innovation Hub',
    description: 'A day-long conference featuring alumni speakers who are leaders in technology.',
    image: '/Tech Innovation Summit.jpg'
  },
  {
    _id: '4',
    title: 'Alumni Sports Tournament',
    date: '2025-06-05T10:00:00',
    location: 'University Sports Complex',
    description: 'Annual sports competition between alumni batches.',
    image: '/Alumni Sports Tournament.jpg'
  },
  {
    _id: '5',
    title: 'Community Service Day',
    date: '2025-04-18T08:00:00',
    location: 'Community Center',
    description: 'Give back to the community through this volunteer opportunity.',
    image: '/Community Service Day.jpg'
  },
  {
    _id: '6',
    title: 'Alumni Business Expo',
    date: '2025-05-22T11:00:00',
    location: 'University Convention Center',
    description: 'Showcase your business or discover ventures started by fellow alumni.',
    image: '/Alumni Business Expo.jpg'
  }
];

function Events() {
  const [search, setSearch] = useState('');
  const [events] = useState(sampleEvents); // Use sampleEvents directly

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="events-container">
      <Sidebar className="events-sidebar" />
      <div className="events-main-content">
        <AppBar position="static" className="events-appbar">
          <Toolbar>
            <Typography variant="h6" className="events-title">
              Upcoming Events
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="events-search-container">
          <TextField
            variant="outlined"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="events-search-field"
            size="small"
          />
        </div>

        {filteredEvents.length === 0 ? (
          <div className="events-no-results">
            No events found. Try a different search term.
          </div>
        ) : (
          <Grid container spacing={3} className="events-grid">
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card className="events-card">
                  <CardMedia
                    component="img"
                    height="150"
                    image={event.image || `https://via.placeholder.com/400x150?text=${encodeURIComponent(event.title)}`}
                    alt={event.title}
                  />
                  <CardContent className="events-card-content">
                    <Typography variant="h5" className="events-card-title">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" className="events-card-date">
                      <span className="events-calendar-icon">📅</span>{' '}
                      {formatDate(event.date)}{' '}
                      <span className="events-indicator">●</span>
                    </Typography>
                    <Typography variant="body2" className="events-card-location">
                      {event.location}
                    </Typography>
                    <Typography variant="body2" className="events-card-description">
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Events;
