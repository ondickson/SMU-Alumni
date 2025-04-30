import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventPage.css';
import SidebarMenu from '../Sidebar';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function EventPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/events');
      const sortedEvents = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData({ ...eventData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (event) => {
    // setEventData(event);
    setEventData({
      ...event,
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '', // format to "YYYY-MM-DD"
    });
    setSelectedEventId(event._id);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/events/${eventIdToDelete}`);
      setDeleteDialogOpen(false);
      setEventIdToDelete(null);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSaveEvent = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5001/api/events/${selectedEventId}`,
          eventData,
        );
      } else {
        await axios.post('http://localhost:5001/api/events', eventData);
      }
      setOpen(false);
      setEditMode(false);
      setEventData({
        title: '',
        date: '',
        location: '',
        description: '',
        image: '',
      });
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className="container">
      <SidebarMenu className="sidebar" />
      <div className="main-content">
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Events Management
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="search-add-container">
          <TextField
            variant="outlined"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-field"
            size="small"
          />
          <Button
            variant="outlined"
            color="primary"
            className="add-event-button"
            onClick={() => {
              setEventData({
                title: '',
                date: '',
                location: '',
                description: '',
                image: '',
              });
              setEditMode(false);
              setSelectedEventId(null);
              setOpen(true);
            }}
          >
            Add Event
          </Button>
        </div>

        <Grid container spacing={3} className="event-list">
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card className="event-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h5" className="event-title">
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="event-date"
                  >
                    📅{' '}
                    {new Date(event.date).toLocaleString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}{' '}
                    | 📍 {event.location}
                  </Typography>

                  <Typography variant="body2" className="event-description">
                    {event.description}
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <Edit
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEditClick(event)}
                      color="primary"
                    />
                    <Delete
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setEventIdToDelete(event._id);
                        setDeleteDialogOpen(true);
                      }}
                      color="error"
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Confirm Delete Job Dialog Box */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle className="dialog-title">Delete Event</DialogTitle>
        <DialogContent className="dialog-content">
          Are you sure you want to delete this event?
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for adding a new event */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">Add New Event</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            name="title"
            fullWidth
            margin="dense"
            label="Event Title"
            value={eventData.title}
            onChange={handleChange}
          />

          <TextField
            name="date"
            fullWidth
            margin="dense"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={eventData.date}
            onChange={handleChange}
          />

          <TextField
            name="location"
            fullWidth
            margin="dense"
            label="Location"
            value={eventData.location}
            onChange={handleChange}
          />

          <TextField
            name="description"
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            value={eventData.description}
            onChange={handleChange}
          />

          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {eventData.image && (
            <img
              src={eventData.image}
              alt="Event Preview"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                marginBottom: '10px',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveEvent}>
            {editMode ? 'Update Event' : 'Add Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPage;
