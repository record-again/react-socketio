import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const handleTyping = () => {
    let user = JSON.parse(localStorage.getItem("userName"));
    socket.emit("typing", user.name);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("userName"));

    if (message.trim() && user.name) {
      socket.emit("message", {
        text: message,
        name: user.name,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
