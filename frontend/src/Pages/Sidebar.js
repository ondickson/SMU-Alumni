import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Home, AccountCircle, Group, WorkOutline, Event, Report, Security, Settings, Logout } from "@mui/icons-material";
import "./Sidebar.css"; 

const sidebarWidth = 250; 

const SidebarMenu = () => {
  const role = localStorage.getItem("role"); // Get role from localStorage

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
          {role === "admin" ? "Admin" : "Alumni"}
        </Typography>
      </div>

      {/* Main Menu - Dynamic Based on Role */}
      <div style={{ flexGrow: 1 }}>
        <Menu>
          {role === "admin" ? (
            <>
              <MenuItem icon={<Group />} component={<Link to="/AdminDashboard" />}>Home</MenuItem>
              <MenuItem icon={<WorkOutline />} component={<Link to="/AlumniInformation" />}>Alumni Information</MenuItem>
              <MenuItem icon={<Event />} component={<Link to="/EventPage" />}>Events</MenuItem>
              <MenuItem icon={<Security />} component={<Link to="/JobPost" />}>JobPost</MenuItem>
              <MenuItem icon={<Settings />} component={<Link to="/AccountSetting" />}>Account Settings</MenuItem>
            </>
          ) : (
            <>
              <MenuItem icon={<Home />} component={<Link to="/AlumniDashboard" />}>Home</MenuItem>
              <MenuItem icon={<AccountCircle />} component={<Link to="/Profile" />}>Profile</MenuItem>
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
          <MenuItem 
            icon={<Logout />} 
            style={{ color: "red" }} 
            component={<Link to="/login" />}
            onClick={() => localStorage.clear()} // Clear storage on logout
          >
            Log Out
          </MenuItem>
        </Menu>
      </div>
      
    </ProSidebar>
  );
};

export default SidebarMenu;
