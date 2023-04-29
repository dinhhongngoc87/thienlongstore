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
app.use(
  cors({
    origin: ["http://localhost:3001"],
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join", function (data) {
    socket.join(data.room);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
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
