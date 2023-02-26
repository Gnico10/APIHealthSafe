import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { io } from '../app';

import Mensajeria from '../models/mensajeria';
import Mensaje from '../models/mensaje';

export const crearMensajeria = async (req: Request, res: Response) => {
  try {
    const { idpaciente, idprofesional } = req.body;
    const mensajeria = await Mensajeria.create({ idpaciente, idprofesional });

    return res.status(201).json(mensajeria);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ocurrió un error al crear la mensajería.' });
  }
};

export const enviarMensaje = async (req: Request, res: Response) => {
  try {
    const { idmensajeria, mensaje } = req.body;
    const fechaHora = new Date();
    const nuevoMensaje = await Mensaje.create({ idmensajeria, mensaje, fechahora: fechaHora });

    // Enviamos el mensaje a través de WebSocket
    io.emit('mensaje', nuevoMensaje);

    return res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ocurrió un error al enviar el mensaje.' });
  }
};

export const obtenerMensajes = async (req: Request, res: Response) => {
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
