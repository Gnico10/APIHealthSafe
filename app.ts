import dotenv from 'dotenv';
import Server from './server';

dotenv.config(); // Para leer todas las variables de entorno.

const server = new Server();

server.listen();

