import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import SidebarMenu from "../Sidebar"; 

const sidebarWidth = 250; // Sidebar width

function StudentInformation() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <SidebarMenu />
      
      <div style={{   flex: 1, background: "#f8f9fa",  padding: "20px", marginLeft: `${sidebarWidth}px`,
      }}>
        <AppBar position="static" style={{ background: "#272974" }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Student Information
            </Typography>
          </Toolbar>
        </AppBar>

        <Typography variant="h5" style={{ margin: "20px 0" }}>Dashboard</Typography>

        <Grid container spacing={3}>
          {[
            { title: "Total Events", value: 5 },
            { title: "Total Courses", value: 11 },
            { title: "New Job Post Requests", value: 3 },
            { title: "Approved Job Posts", value: 2 },
            { title: "Rejected Job Posts", value: 0 },
            { title: "Total Alumni Registered", value: 5 },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography>{stat.title}</Typography>
                  <Button variant="contained" style={{ marginTop: "10px" }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default StudentInformation;
