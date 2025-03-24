import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]); // Store fetched events

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/events');
      setEvents(response.data); // Update state with fetched events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

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
