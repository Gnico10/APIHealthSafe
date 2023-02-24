import dotenv from 'dotenv';
import Server from './server';
import io from "socket.io-client";

dotenv.config(); // Para leer todas las variables de entorno.

const server = new Server();

server.listen();



const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});
