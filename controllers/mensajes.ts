import { Request, Response } from "express";
import Message from "../models/mensaje";
import Mensajeria from "../models/mensajeria";

import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

interface Message {
  sender: string;
  text: string;
}

const messages: Message[] = [];

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  socket.emit("messages", messages);

  socket.on("newMessage", (message: Message) => {
    messages.push(message);
    io.emit("messages", messages);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
