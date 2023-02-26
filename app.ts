import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './db/connection';
import mensajeModel from './models/mensaje';

import mensajesRouter from './routes/mensajes';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Configuración de rutas
app.use('/api', mensajesRouter);

// Configuración de WebSocket
io.on('connection', async (socket) => {
  console.log(`Socket conectado: ${socket.id}`);

  // Cuando el cliente se conecta, se suscribe al canal de mensajes
  socket.on('join', (idmensajeria: number) => {
    socket.join(`mensajeria-${idmensajeria}`);
  });

  // Cuando se recibe un mensaje, se guarda en la base de datos y se envía a través de WebSocket
  socket.on('mensaje', async (mensaje) => {
    const nuevoMensaje = await mensajeModel.create(mensaje);
    io.to(`mensajeria-${nuevoMensaje.idmensajeria}`).emit('mensaje', nuevoMensaje);
  });

  // Cuando se desconecta el cliente, se elimina la suscripción al canal de mensajes
  socket.on('disconnect', () => {
    console.log(`Socket desconectado: ${socket.id}`);
  });
});

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => console.log('Error al conectar con la base de datos:', err));

// Inicio del servidor
server.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

export { io };
