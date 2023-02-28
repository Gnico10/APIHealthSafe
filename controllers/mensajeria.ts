import { Request, Response } from 'express';
import { Op } from 'sequelize';
import  io  from '../server_socket';
import Mensajeria from '../models/mensajeria';
import Mensaje from '../models/mensaje';

export const postMensajeria = async (req: Request, res: Response) => {
    try {
      const { idpaciente, idprofesional } = req.body;
      const mensajeria = await Mensajeria.create({ idpaciente, idprofesional });
  
      return res.status(201).json(mensajeria);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ocurrió un error al crear la mensajería.' });
    }
  };


// Configurar las rutas de la aplicación
export const getMensajerias = async (req: Request, res: Response) => {  
    // Obtener todas las mensajerías de la base de datos
    const mensajerias = await Mensajeria.findAll();
    
    // Enviar las mensajerías como respuesta
    res.json(mensajerias);
  };
  
