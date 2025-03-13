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

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Food Festival",
      date: "April 15, 2025",
      location: "Central Park",
      description: "A celebration of diverse cuisines and local delicacies.",
      image: "https://source.unsplash.com/400x250/?food,festival",
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "June 10, 2025",
      location: "Silicon Valley",
      description: "Exploring the future of AI, Blockchain, and Tech Innovations.",
      image: "https://source.unsplash.com/400x250/?technology,conference",
    },
    {
      id: 3,
      title: "Music Concert",
      date: "August 20, 2025",
      location: "Madison Square Garden",
      description: "Join us for an unforgettable night with top artists.",
      image: "https://source.unsplash.com/400x250/?concert,music",
    },
  ];

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
            <Grid item xs={12} sm={6} md={4} key={event.id}>
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
          <TextField fullWidth margin="dense" label="Event Title" />
          <TextField fullWidth margin="dense" label="Date" type="date" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth margin="dense" label="Location" />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} />
          <input type="file" className="file-input" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary">Add Event</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventPage;
