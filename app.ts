import dotenv from 'dotenv';
import Server from './server';
import ServerSocket from './server_socket';

dotenv.config(); // Para leer todas las variables de entorno.

const server = new Server();
const serverSocket = new ServerSocket(server.server);

server.listen();

export default serverSocket;