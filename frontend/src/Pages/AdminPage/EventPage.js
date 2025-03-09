import React, { useState } from "react";
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
  const [events, setEvents] = useState([
    { title: "Alumni Meetup", date: "2025-04-15", location: "City Hall", description: "A gathering of alumni to reconnect." },
    { title: "Career Fair", date: "2025-06-10", location: "University Gym", description: "Opportunities for alumni and students." },
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", description: "" });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: "", date: "", location: "", description: "" });
    setOpen(false);
  };

  return (
    <div className="container">
      <SidebarMenu className="sidebar" />
      <div className="main-content">

        
        <AppBar position="static" className="appbar">
          <Toolbar>
            <Typography variant="h6" className="title">Events Management</Typography>
            <Button color="inherit" onClick={() => setOpen(true)}>Add Event</Button>
          </Toolbar>
        </AppBar>

        <Typography variant="h5" style={{ margin: "20px 0" }}></Typography>

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
          <TextField
            fullWidth
            margin="dense"
            label="Event Title"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Date"
            type="date"
            name="date"
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Location"
            name="location"
            value={newEvent.location}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={newEvent.description}
            onChange={handleChange}
            className="input-field"
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Add Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPage;
