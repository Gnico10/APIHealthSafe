import { Request, Response } from 'express';
import { Op } from 'sequelize';
import  serverSocket  from '../app';

import Mensajeria from '../models/mensajeria';
import Mensaje from '../models/mensaje';



export const postMensaje = async (req: Request, res: Response) => {
  try {
    const { mensaje, idmensajeria } = req.body;
    const nuevoMensaje = await Mensaje.create({ mensaje, idmensajeria });

    // Enviamos el mensaje a través de WebSocket
    serverSocket.io.emit('mensaje', nuevoMensaje);

    return res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ocurrió un error al enviar el mensaje.' });
  }
};

export const getMensajes = async (req: Request, res: Response) => {
  try {
    const { idmensajeria } = req.params;
    const mensajes = await Mensaje.findAll({
      where: { idmensajeria },
      include: [{ model: Mensajeria, as: 'mensajeria' }],
    });

    return res.status(200).json(mensajes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ocurrió un error al obtener los mensajes.' });
  }
};
