import { Request, Response } from 'express';
import  serverSocket  from '../app';

import Mensajeria from '../models/mensajeria';
import Mensaje from '../models/mensaje';
import Paciente from '../models/paciente';
import Profesional from '../models/profesional';



export const postMensaje = async (req: any, res: Response) => {
  try {
    const { idmensajeria,
            mensaje,
            rolemisor,
            idemisor,
            tipomensaje } = req.body;

    // Validaciones
    const mensajeriaDB = await Mensajeria.findByPk(idmensajeria);

    if (!mensajeriaDB){
      return res.status(400).json({
          msg: `La Mensajeria con id ${idmensajeria} no existe`
      });
    }

    const idusuarioemisor = req.idUsuarioToken 
    const pacienteDB = await Paciente.findOne({
      where: {
        idusuario: idusuarioemisor
      }
    });

    const profesionalDB = await Profesional.findOne({
      where: {
        idusuario: idusuarioemisor
      }
    });

    if (pacienteDB?.idusuario != idusuarioemisor && 
      profesionalDB?.idusuario != idusuarioemisor){
      return res.status(400).json({
          msg: `El remitente con idusuario: ${idusuarioemisor} no pertenece a la mensajeria.`
      });
    }

    const nuevoMensaje = await Mensaje.create({ 
      idmensajeria,
      mensaje,
      rolemisor,
      idemisor,
      tipomensaje
    });

    // Enviamos el mensaje a través de WebSocket
    serverSocket.io.emit(`mensajeria${mensajeriaDB.idmensajeria}`, nuevoMensaje);

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
