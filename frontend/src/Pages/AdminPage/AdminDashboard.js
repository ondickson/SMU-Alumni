import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, Button, Tooltip } from "@mui/material";
import SidebarMenu from "../Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./AdminDashboard.css";

const sidebarWidth = 250;
const barChartData = [
  { month: "Jan", events: 5000 },
  { month: "Feb", events: 7000 },
  { month: "Mar", events: 4000 },
  { month: "Apr", events: 6000 },
  { month: "May", events: 6500 },
  { month: "Jun", events: 7100 },
];

const localizer = momentLocalizer(moment);

function AdminDashboard() {
  const [events, setEvents] = useState([
    { title: "Alumni Meetup", start: new Date(2025, 3, 15), end: new Date(2025, 3, 15) },
    { title: "Career Fair", start: new Date(2025, 5, 10), end: new Date(2025, 5, 10) },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter Event Title");
    if (title) {
      setEvents([...events, { title, start, end }]);
    }
  };

  const eventStyleGetter = () => ({ className: "admin-dashboard-event-style" });

  return (
    <div className="admin-dashboard">
      <SidebarMenu />
      <div className="admin-dashboard-content">
        <AppBar position="static" className="admin-dashboard-appbar">
          <Toolbar className="admin-dashboard-toolbar">
            <Typography variant="h6">Admin Dashboard</Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {[
            { title: "Incoming Events", value: "11" },
            { title: "Open Jobs", value: "20" },
            { title: "Total Alumni Registered", value: "233" },
            { title: "FeedBacks", value: "2" },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="admin-dashboard-card">
                <Typography variant="h5" className="admin-dashboard-card-title">{stat.value}</Typography>
                <Typography variant="body2" color="textSecondary">{stat.title}</Typography>
                <Button variant="contained" color="primary" size="small" className="admin-dashboard-card-button">View Details</Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={8}>
            <Card className="admin-dashboard-overview">
              <CardContent>
                <Typography variant="h6" className="admin-dashboard-overview-title">Overview</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartTooltip />
                    <Bar dataKey="events" fill="#272974" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <Button variant="contained" color="primary" size="small" className="admin-dashboard-overview-button">More Insights</Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="admin-dashboard-calendar-card">
              <CardContent>
                <Typography variant="h6" className="admin-dashboard-calendar-title">Calendar</Typography>
                <div className="admin-dashboard-calendar-container">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 300, borderRadius: "8px" }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    eventPropGetter={eventStyleGetter}
                    components={{
                      toolbar: ({ label, onNavigate }) => (
                        <div className="admin-dashboard-calendar-toolbar">
                          <Button onClick={() => onNavigate("PREV")} className="admin-dashboard-calendar-button">{"<"}</Button>
                          <Typography variant="h6">{label}</Typography>
                          <Button onClick={() => onNavigate("NEXT")} className="admin-dashboard-calendar-button">{">"}</Button>
                        </div>
                      ),
                      event: ({ event }) => (
                        <Tooltip title={event.title} arrow>
                          <div>{event.title}</div>
                        </Tooltip>
                      ),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminDashboard;
