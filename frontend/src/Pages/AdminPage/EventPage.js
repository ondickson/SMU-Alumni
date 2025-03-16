import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./EventPage.css";
import SidebarMenu from "../Sidebar";
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
} from "@mui/material";

function EventPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]); // Store fetched events
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
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

  const handleAddEvent = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/events", eventData);
      console.log("Event added:", response.data); // Debugging
      setOpen(false);
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <SidebarMenu className="sidebar" />
      <div className="main-content">
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">Events Management</Typography>
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
          <Button variant="outlined" color="primary" className="add-event-button" onClick={() => setOpen(true)}>
            Add Event
          </Button>
        </div>

        <Grid container spacing={3} className="event-list">
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card className="event-card">
                <CardMedia component="img" height="200" image={event.image} alt={event.title} />
                <CardContent>
                  <Typography variant="h5" className="event-title">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary" className="event-date">
                    📅 {event.date} | 📍 {event.location}
                  </Typography>
                  <Typography variant="body2" className="event-description">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Dialog for adding a new event */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">Add New Event</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField name="title" fullWidth margin="dense" label="Event Title" onChange={handleChange} />
          <TextField name="date" fullWidth margin="dense" label="Date" type="date" InputLabelProps={{ shrink: true }} onChange={handleChange} />
          <TextField name="location" fullWidth margin="dense" label="Location" onChange={handleChange} />
          <TextField name="description" fullWidth margin="dense" label="Description" multiline rows={3} onChange={handleChange} />
          <input type="file" className="file-input" accept="image/*" onChange={handleImageUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPage;
