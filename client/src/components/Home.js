import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    let session = JSON.stringify({ socket_id: socket.id, name: userName });
    localStorage.setItem("userName", session);
    // socket.emit("newUser", { userName, socketID: socket.id });
    socket.emit("newUser", userName);
    // navigate("/chat");
  };

  useEffect(() => {
    socket.on("newUserResponse", (status) => {
      if (status) {
        navigate("/chat");
        // console.log(status);
      } else {
        alert("Nama user sudah dipakai!!");
        // console.log(status);
      }
    });

    return () => {
      socket.off("newUserResponse");
    };
  }, []);

  return (
    <form className="home__container">
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="button" className="home__cta" onClick={handleSubmit}>
        SIGN IN
      </button>
    </form>
  );
};

export default Home;
