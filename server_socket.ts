// Importar los paquetes necesarios
import express, { Request, Response, Application } from 'express';
import { Server } from 'socket.io';
import Mensajeria from './models/mensajeria';
import Mensaje from './models/mensaje';
import http from 'http';
import sequelize from './db/connection';


class ServerSocket {
    public io: Server;

    constructor(server:any){
        this.io = new Server(server, { cors: { origin: '*' } });
        // Configurar la conexión de Socket.io
        this.io.on('connection', (socket) => {
            console.log('Usuario conectado:', socket.id);
            
            // Manejar la recepción de mensajes de un usuario
            socket.on('mensaje', async (data) => {
            const { idmensajeria, mensaje, rolemisor, idemisor, tipomensaje, fechahora } = data;
            
            const nuevoMensaje = await Mensaje.create({ idmensajeria, mensaje, rolemisor, idemisor,  tipomensaje, fechahora });
            
            // Enviar el mensaje a todos los usuarios conectados a la misma mensajería
            this.io.to(`mensajeria-${idmensajeria}`).emit('mensaje', nuevoMensaje);
            });
            
            // Manejar la conexión de un usuario a una mensajería
            socket.on('conectar', (data) => {
            const { idmensajeria } = data;
            
            // Unir al usuario a la sala correspondiente a la mensajería
            socket.join(`mensajeria-${idmensajeria}`);
            });
            
            // Manejar la desconexión de un usuario
            socket.on('disconnect', () => {
            console.log('Usuario desconectado:', socket.id);
            });
        });
    }

} 

export default ServerSocket;