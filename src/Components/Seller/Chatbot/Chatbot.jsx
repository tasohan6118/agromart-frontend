// src/components/Chatbot/Chatbot.jsx

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../../../services/chatService';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      text: "🌾 Hello! I'm AgriBot. I know everything about the Agro Mart project, its features, government schemes, crop calendars, and market prices. Ask me anything!", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botReply = await sendMessageToAI(input);
    const botMsg = { text: botReply, sender: 'bot' };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
 

  return (
    <div className="chatbot-modal-overlay" onClick={onClose}>
      <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chatbot-header">
          <span>🌾 AgriBot</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="msg bot">⏳ Thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about schemes, crops, prices, or the project..."
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;