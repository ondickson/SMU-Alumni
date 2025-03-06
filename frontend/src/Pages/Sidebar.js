import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Typography } from "@mui/material";
import { Group, Work, Event, Security, Settings } from "@mui/icons-material";
import "./Sidebar.css"; 

const CustomSidebar = () => {
  return (
    <ProSidebar className="custom-sidebar">
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" style={{ color: "black" }}><b> Admin</b></Typography>
      </div>
      <Menu>
        <MenuItem icon={<Group />} component={<Link to="/" />}>Home</MenuItem>
        <MenuItem icon={<Work />} component={<Link to="/StudentInformation" />}>Student Information</MenuItem>
        <MenuItem icon={<Event />} component={<Link to="/AlumniInformation" />}>Alumni Information</MenuItem>
        <MenuItem icon={<Security />} component={<Link to="/" />}>Account Settings</MenuItem>
        <MenuItem icon={<Settings />} component={<Link to="/" />}>Logout</MenuItem>
      </Menu>
    </ProSidebar>
  );
};

export default CustomSidebar;