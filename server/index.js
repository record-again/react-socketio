const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
var users = [];

socketIO.on("connection", (socket) => {
  // -------
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  // socket.on("typing", (data) => socket.emit("typingResponse", data));
  socket.on("typing", (data) =>
    socket.broadcast.emit("typingResponse", { status: true, username: data })
  );

  socket.on("newUser", (data) => {
    const find = users.find((user) => {
      return user.name === data;
    });
    if (find === undefined) {
      let user = { socket_id: socket.id, name: data };
      users.push(user);
      socketIO.to(socket.id).emit("newUserResponse", true);
      socketIO.timeout(1000).emit("usersData", users);
      console.log(user);
    } else {
      socketIO.to(socket.id).emit("newUserResponse", false);
    }
    // console.log(users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socket_id !== socket.id);
    socketIO.emit("usersData", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
