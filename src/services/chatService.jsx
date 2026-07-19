// src/services/chatService.jsx

const BACKEND_URL = 'http://localhost:5000';

export const sendMessageToAI = async (userMessage) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Failed to send message:', error);
    return "Network error. Is your backend server running?";
  }
};