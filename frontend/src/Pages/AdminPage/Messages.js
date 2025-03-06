import React, { useState } from 'react';
import SidebarMenu from "../Sidebar"; 

function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How are you?', sender: 'other' },
    { id: 2, text: "I'm good! How about you?", sender: 'me' },
    { id: 3, text: 'Doing great! Thanks for asking.', sender: 'other' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'me' }]);
    setNewMessage('');
  };

  return (
    <div className="messages-container">
         <SidebarMenu />
      <div className="messages-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default Messages;
