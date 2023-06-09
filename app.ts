import dotenv from 'dotenv';
import Server from './server';
import ServerSocket from './server_socket';

dotenv.config(); // Para leer todas las variables de entorno.

const server = new Server();
const serverSocket = new ServerSocket(server.server);

server.listen();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'TU_CLOUD_NAME',
  api_key: 'TU_API_KEY',
  api_secret: 'TU_API_SECRET',
});

export default serverSocket;