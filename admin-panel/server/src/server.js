import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectdb";
require("dotenv").config();
let app = express();

const http = require("http");
const cors = require("cors");
//congif app
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "OPTIONS"],
  },
});
var users = [];
io.on("connection", async (socket) => {
  socket.on("user_connected", (userInfo) => {
    //check if have user ever send message to admin yet
    let isExist = users.some((user) => user.inFo.id === userInfo.id);
    //add to user chat list if not exist
    if (!isExist) {
      users.push({
        id: socket.id,
        author: `${userInfo.firstName} ${userInfo.lastName}` || `anonymours`,
        inFo: userInfo,
      });
    }
    //save user in array

    //socket id will be used to send message to indivisual person

    //notify all connected clients
    io.emit("user_connected", users);
  });
  socket.emit("users chat", users);

  socket.on("join", function (data) {
    socket.join(data.room);
    socket.emit("receive_message", `New person join room ${data.room}`);
    io.to(data.room).emit("receive_message", "admin join room");
  });

  socket.on("send_message", (data) => {
    socket.join(data.room);
    socket.emit("user_connected", users);
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});
const adminNamespace = io.of("/admin");
adminNamespace.on("connection", (socket) => {
  socket.join("room1");
  userNamespace.to("room1").emit("hola");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
viewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.port || 6969;
server.listen(port, () => {
  //callback
  console.log("Backend is running on port", port);
});
