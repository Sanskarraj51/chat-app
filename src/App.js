import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:5001"); // Replace with your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => socket.off("message");
  }, []);

  function sendMessage(e) {
    e.preventDefault();

    if (message?.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages?.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
