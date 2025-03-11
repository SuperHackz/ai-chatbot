import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  
  const handleSendMessage = async () => {
    if (!message) return;

    const newMessage = { sender: 'user', text: message };
    setConversation([...conversation, newMessage]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    const botMessage = { sender: 'bot', text: data.reply };
    setConversation([...conversation, newMessage, botMessage]);
    setMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Chatbot</h1>
      <div>
        {conversation.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p style={{ backgroundColor: msg.sender === 'user' ? '#e0e0e0' : '#f1f1f1', padding: '10px', borderRadius: '10px' }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '10px' }}>Send</button>
    </div>
  );
}