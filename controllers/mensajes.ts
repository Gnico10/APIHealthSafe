import { Request, Response } from 'express';
import { Op } from 'sequelize';
import  serverSocket  from '../app';

import Mensajeria from '../models/mensajeria';
import Mensaje from '../models/mensaje';



export const postMensaje = async (req: any, res: Response) => {
  try {
    const { mensaje, idmensajeria } = req.body;

    // Validaciones
    const mensajeriaDB = await Mensajeria.findByPk(idmensajeria);

    if (!mensajeriaDB){
      return res.status(400).json({
          msg: `La Mensajeria con id ${idmensajeria} no existe`
      });
    }

    const idusuarioemisor = req.idUsuarioToken
    if (mensajeriaDB.idpaciente != idusuarioemisor && mensajeriaDB.idprofesional != idusuarioemisor){
      return res.status(400).json({
          msg: `El remitente con id ${idusuarioemisor} no pertenece a la mensajeria.`
      });
    }

    const nuevoMensaje = await Mensaje.create({ 
      mensaje, 
      idmensajeria,
      idusuarioemisor
    });

    // Enviamos el mensaje a través de WebSocket
    serverSocket.io.emit('mensaje', nuevoMensaje);

    return res.status(201).json(nuevoMensaje);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: 'Ocurrió un error al enviar el mensaje.' });
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
    return res.status(400).json({ msg: 'Ocurrió un error al obtener los mensajes.' });
  }
};
