import dotenv from 'dotenv';
import Server from './models/server';

dotenv.config(); // Para leer todas las variables de entorno.

const server = new Server();

server.listen();

