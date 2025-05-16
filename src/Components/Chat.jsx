import React, { useEffect, useState } from 'react';
import Chatmessage from './Chatmessage';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '/src/config/firebase.jsx';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesRef = collection(db, 'messages');

  const handleSubmit = async () => {
    if (text.trim() === '') return;

    const newMessage = {
      text,
      email: user?.email || "anonymous@example.com",
      logo: '',
      date: new Date(),
    };

    setMessages([...messages, newMessage]);
    setText('');

    await addDoc(messagesRef, newMessage);

    // Scroll after 500ms
    setTimeout(() => {
      const el = document.querySelector('#copyright');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  useEffect(()=>{
    const unsubscribe=onSnapshot(messagesRef,(quertSnapshot)=>{
      const newMessages=quertSnapshot.docs.map((doc)=>doc.data())
      .sort((a,b)=>a.data-b.data);
      setMessages(newMessages)

    })
    return ()=>unsubscribe();
  },[])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <h1 className="text-primary">Chat App</h1>
        </div>

        <div className="chat-messages mb-3 border rounded p-3" style={{ height: '300px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <Chatmessage key={index} {...msg} />
          ))}
        </div>

        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="button" className="btn btn-secondary" onClick={handleSubmit}>
            Send
          </button>
        </div>

        <div className="text-center mt-4 text-muted" id='copyright'>
          © Saranyadevi - All rights reserved
        </div>
      </div>
    </div>
  );
}
