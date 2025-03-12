import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import SidebarMenu from "../Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
    {
      title: "Alumni Meetup",
      start: new Date(2025, 3, 15),
      end: new Date(2025, 3, 15),
    },
    {
      title: "Career Fair",
      start: new Date(2025, 5, 10),
      end: new Date(2025, 5, 10),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter Event Title");
    if (title) {
      const newEvent = { title, start, end };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarMenu />
      <div style={{ flex: 1, background: "#f8f9fa", padding: "20px", marginLeft: `${sidebarWidth}px`, overflowX: "hidden" }}>
        <AppBar position="static" style={{ background: "#272974" }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {[ 
            { title: "Incoming Events", value: "11" }, 
            { title: "Open Jobs", value: "20" }, 
            { title: "Total Alumni Registered", value: "233" }, 
            { title: "Active Now", value: "2" } 
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card style={{ padding: "20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>{stat.value}</Typography>
                <Typography variant="body2" color="textSecondary">{stat.title}</Typography>
                <Button variant="contained" color="primary" size="small" style={{ marginTop: "10px" }}>View Details</Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={8}>
            <Card style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography variant="h6" style={{ marginBottom: "10px" }}>Overview</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#272974" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <Button variant="contained" color="primary" size="small" style={{ alignSelf: "center", marginBottom: "10px" }}>More Insights</Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" style={{ marginBottom: "10px" }}>Calendar</Typography>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 300 }}
                  selectable
                  onSelectSlot={handleSelectSlot}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminDashboard;
