import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Group, Home, WorkOutline, Event, Report, Security, Settings, Logout, MailOutline } from "@mui/icons-material";
import "./Sidebar.css"; 

const sidebarWidth = 250; 

const SidebarMenu = ({ role }) => {
  return (
    <ProSidebar 
      className="custom-sidebar"
      style={{
        width: `${sidebarWidth}px`, 
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sidebar Header */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" style={{ color: "black" }}>
          <h1>Admin</h1>
        </Typography>
      </div>

      {/* Main Menu - Dynamic Based on Role */}
      <div style={{ flexGrow: 1 }}>
        <Menu>
          {role === "admin" ? (
            <>
              <MenuItem icon={<Group />}>Alumni Management</MenuItem>
              <MenuItem icon={<WorkOutline />}>Job Listings</MenuItem>
              <MenuItem icon={<Event />}>Events & News</MenuItem>
              <MenuItem icon={<Report />}>Analytics & Reports</MenuItem>
              <MenuItem icon={<Security />}>Security</MenuItem>
              <MenuItem icon={<Settings />}>Settings</MenuItem>
            </>
          ) : (
            <>
              <MenuItem icon={<Home />} component={<Link to="/AdminDashboard" />}>Home</MenuItem>
              <MenuItem icon={<Group />} component={<Link to="/AlumniInformation" />}>Alumni Information</MenuItem>
              <MenuItem icon={<Event />} component={<Link to="/EventPage" />}>Events</MenuItem>
              <MenuItem icon={<WorkOutline />} component={<Link to="/JobPost" />}>Job Post</MenuItem>
              <MenuItem icon={<Security />} component={<Link to="/AccountSetting" />}>Account Settings</MenuItem>
            </>
          )}
        </Menu>
      </div>

      {/* Log Out Button at the VERY Bottom */}
      <div style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
      }}>
        <Menu>
          <MenuItem icon={<Logout />} style={{ color: "red" }} component={<Link to="/login" />}>
            Log Out
          </MenuItem>
        </Menu>
      </div>
      
    </ProSidebar>
  );
};

export default SidebarMenu;