import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
      setTypingStatus(false);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTypingStatus(data);
      // console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter
          socket={socket}
          setTypingStatus={() => setTypingStatus(false)}
        />
      </div>
    </div>
  );
};

export default ChatPage;
