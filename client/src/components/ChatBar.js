import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("usersData", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("usersData");
    };
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>User List</h2>
      <div>
        <h4 className="chat__header"></h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socket_id} id={user.socket_id}>
              {user.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
