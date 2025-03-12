import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function EventPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", description: "" });

  // Fetch events from the database
  useEffect(() => {
    axios.get("http://localhost:5001/api/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Add new event to database
  const handleSubmit = () => {
    axios.post("http://localhost:5001/api/events", newEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setNewEvent({ title: "", date: "", location: "", description: "" });
        setOpen(false);
      })
      .catch(error => console.error("Error adding event:", error));
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

        {/* Search and Add Event Section */}
        <div className="search-add-container">
          <TextField
            variant="outlined"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-field"
            size="small"
          />
          <Button variant="outlined" color="primary" className="add-event-button" onClick={() => setOpen(true)}>Add Event</Button>
        </div>

        <Grid container spacing={3} className="event-list">
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="event-card">
                <CardContent>
                  <Typography variant="h5" className="event-title">{event.title}</Typography>
                  <Typography variant="body1" className="event-date">{event.date} - {event.location}</Typography>
                  <Typography variant="body2" className="event-description">{event.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">Add New Event</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField fullWidth margin="dense" label="Event Title" name="title" value={newEvent.title} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Date" type="date" name="date" InputLabelProps={{ shrink: true }} value={newEvent.date} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Location" name="location" value={newEvent.location} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Description" name="description" multiline rows={3} value={newEvent.description} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Add Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPage;
