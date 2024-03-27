import React, { useRef, useEffect, useState } from 'react';

import Button from "react-bootstrap/Button";
import TextField from '@mui/material/TextField';
import './ChatArea.css'

const ChatArea = ( {
    //messages
}) => {
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [ inputMessage, setInputMessage ] = useState('')

  const [messages, setMessages] = useState([]);

  const dummyMessages = Array.from({ length: 50 }, (_, index) => `Message ${index + 1}`);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value)
    console.log(inputMessage)
  }

  useEffect(() => {
    // Update the state with the array of 50 messages
    setMessages(dummyMessages);
  }, []);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  const handleSendMessage = (e) => {

    if(inputMessage.trim() !== '') {
        setMessages((prevMessages) => [...prevMessages, inputMessage.trim()])
        setInputMessage('')
    }
  }

  return (
    <div className="chat-container" ref={chatContainerRef}>
      <div className="messages">
        {/* Populate this div with your chat messages */}
        {messages.map((message, index) => (
          <p className="texts" key={index}>{message}</p>
        ))}
        {/* ... */}
        <div ref={messagesEndRef} />
      </div>
       <div className="send-tool">
            <TextField name="mmsgs" value={inputMessage} onChange={handleInputChange} label="Enter message" size="large" className="msgs"></TextField>
            <Button onClick={() => handleSendMessage()} className="send-msg">Send</Button>
	   </div>
      
    </div>
  );
};

export default ChatArea;