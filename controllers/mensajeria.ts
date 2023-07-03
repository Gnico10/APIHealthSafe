import { Request, Response } from 'express';

import Mensajeria from '../models/mensajeria';

export const postMensajeria = async (req: Request, res: Response) => {
    try {
      const { idPaciente, idprofesional } = req.body;
      const mensajeria = await Mensajeria.create({ idPaciente, idprofesional });
  
      return res.status(201).json(mensajeria);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ocurrió un error al crear la mensajería.' });
    }
  };

// Configurar las rutas de la aplicación
export const getMensajerias = async (req: Request, res: Response) => {
    try {
      // Obtener todas las mensajerías de la base de datos
      const mensajerias = await Mensajeria.findAll();
      
      // Enviar las mensajerías como respuesta
      res.json(mensajerias); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ocurrió un error al obtener las mensajerías.' });
    }
  };
  
