import React, { useState } from "react";

const MessageInput = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("User");

  const handleSendMessage = () => {
    if (message) {
      const newMessage = { user: userName, text: message };
      socket.emit("sendMessage", newMessage); // Send the message
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", userName); // Emit typing event
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleTyping}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
