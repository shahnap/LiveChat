import React from "react";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
