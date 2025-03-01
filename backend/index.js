import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import fs from "fs";
import csv from "csv-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const filePath = "solar_sensor_data.csv";

// Middleware
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "Connected to MongoDB with mongoDB URI: " + process.env.MONGODB_URI
    );
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
};
connectDB();
app.use(router);

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the AI Predictive Maintenance System");
});


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  const rows = [];

  // Read CSV file and store rows in an array
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", () => startStreaming(socket, rows))
    .on("error", (err) => console.error("CSV Read Error:", err.message));

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const startStreaming = (socket, rows) => {
  let rowIndex = 0;

  const sendRow = () => {
    if (!socket.connected || rowIndex >= rows.length) return;

    const data = { data: rows[rowIndex] };
    socket.emit("data_stream", data);
    console.log("Sent:", data);

    rowIndex++;
    setTimeout(sendRow, 1500 ); // Send 3 rows per second
  };

  sendRow();
};

server.listen(3000, () => console.log("Server running on port 3000"));
