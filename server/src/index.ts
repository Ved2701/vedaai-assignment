import "./workers/assignmentWorker";

import express from "express";

import http from "http";

import { Server } from "socket.io";

import cors from "cors";

import dotenv from "dotenv";

import { connectDB } from "./config/db";

import assignmentRoutes
  from "./routes/assignmentRoutes";

dotenv.config();

connectDB();

const app = express();

const server =
  http.createServer(app);

export const io =
  new Server(server, {

    cors: {

      origin: "http://localhost:3000",

      methods: ["GET", "POST"],

    },

  });

app.use(cors());

app.use(express.json());

app.use(
  "/api/assignments",
  assignmentRoutes
);

app.get("/", (req, res) => {

  res.send(
    "VedaAI Backend Running"
  );

});

io.on("connection", (socket) => {

  console.log(
    "User connected:",
    socket.id
  );

  socket.on("disconnect", () => {

    console.log(
      "User disconnected:",
      socket.id
    );

  });

});

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});