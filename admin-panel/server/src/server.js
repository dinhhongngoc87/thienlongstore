import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectdb";
require("dotenv").config();

let app = express();

//congif app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
viewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.port || 6969;
app.listen(port, () => {
  //callback
  console.log("Backend is running on port", port);
});
