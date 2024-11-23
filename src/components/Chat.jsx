import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 3000); // Clear typing after 3 seconds
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, [socket]);

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      {typingUser && <p>{typingUser} is typing...</p>}
      <MessageInput socket={socket} />
    </div>
  );
};

export default Chat;
