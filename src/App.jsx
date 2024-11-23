import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState(""); // Holds current input message
  const [messages, setMessages] = useState([]); // Stores all received messages
  const [socket, setSocket] = useState(null);

  // Setup socket connection
  useEffect(() => {
    const socketConnection = io("http://backendurl", {
      transports: ["websocket"], // Force WebSocket transport
    });

    socketConnection.on("connect", () => {
      console.log("Connected to server:", socketConnection.id);
    });

    // Listen for incoming messages and update state
    socketConnection.on("message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]); // Append the message to the messages state
    });

    setSocket(socketConnection);

    return () => socketConnection.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      console.log("Sending message:", message);
      socket.emit("message", message); // Emit the message
      setMessage(""); // Clear input field after sending
    }
  };



  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Chat App</h1> 
      <div style={styles.messagesContainer}>
        {/* Display all received messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.id === "user1" ? styles.receivedMessage : styles.sentMessage
            }
          >
            <div style={styles.messageHeader}>
              <strong>{msg.id}</strong>
            </div>
            <p style={styles.messageText}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message input
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          Send check
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    backgroundColor: "#F7F7F7",
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "20px",
    fontSize: "28px",
    color: "#0078D4",
  },
  messagesContainer: {
    width: "100%",
    maxWidth: "650px",
    height: "70%",
    overflowY: "auto",
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  receivedMessage: {
    backgroundColor: "#E1FFC7",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    alignSelf: "flex-start",
    wordWrap: "break-word",
  },
  sentMessage: {
    backgroundColor: "#128C7E",
    color: "#ffffff",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    alignSelf: "flex-end",
    wordWrap: "break-word",
  },
  messageHeader: {
    fontSize: "14px",
    color: "#075E54",
    marginBottom: "5px",
  },
  messageText: {
    fontSize: "16px",
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "650px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    marginRight: "12px",
    boxSizing: "border-box",
  },
  sendButton: {
    padding: "12px 20px",
    backgroundColor: "#075E54",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "background-color 0.3s",
  },
};

export default App;
