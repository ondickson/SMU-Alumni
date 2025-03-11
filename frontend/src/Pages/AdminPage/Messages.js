import React, { useState } from 'react';
import SidebarMenu from "../Sidebar";
import { Box, Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import "./Messages.css"; // Import the CSS file

function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How are you?', sender: 'other' },
    { id: 2, text: "I'm good! How about you?", sender: 'me' },
    { id: 3, text: 'Doing great! Thanks for asking.', sender: 'other' }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [people, setPeople] = useState([
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "Chris Wilson"
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'me' }]);
    setNewMessage('');
  };

  return (
    <Box className="messages-container">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Messages Section */}
      <Box className="messages-content">
        {/* Title */}
        <Card className="title-container">
          <CardContent>
            <Typography variant="h5" className="title-text">Messages</Typography>
          </CardContent>
        </Card>

        {/* Messages Box */}
        <Box className="messages-box">
          {messages.map((msg) => (
            <Box key={msg.id} className={`message ${msg.sender}`}>
              {msg.text}
            </Box>
          ))}
        </Box>

        {/* Input Box */}
        <form onSubmit={sendMessage} className="message-input-box">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <Button type="submit" variant="contained" className="send-button">
            Send
          </Button>
        </form>
      </Box>

      {/* People to Chat Section */}
      <Box className="chat-people">
        {/* Title */}
        <Card className="chat-title-container">
          <CardContent>
            <Typography variant="h6" className="chat-title-text">Chats</Typography>
          </CardContent>
        </Card>

        {/* List of People to Chat */}
        <List className="people-list">
          {people.map((person, index) => (
            <ListItem button key={index} className="person-item">
              <ListItemText primary={person} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Messages;
