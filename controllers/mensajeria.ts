import { Request, Response } from 'express';

import Mensajeria from '../models/mensajeria';
import Mensaje from '../models/mensaje';
import Profesional from '../models/profesional';
import Paciente from '../models/paciente';
import Usuario from '../models/usuario';
import Rol from '../models/rol';

async function getMensajeFromMensajeria(idmensajeria: any){
  const mensajes = await Mensaje.findAll({
    where: {
      idmensajeria
    },
    order: [['createdAt', 'DESC']],
    // limit: 10,
    include: [{
      model: Mensajeria,
      as: 'mensajeria',
      include: [{
        model: Paciente,
        as: 'paciente'
      }, {
        model: Profesional,
        as: 'profesional'
      }]
    }]
  });

  return mensajes
}

export const postMensajeria = async (req: Request, res: Response) => {
    try {
      const { idpaciente, idprofesional } = req.body;

      const mensajerias = await Mensajeria.findAll({
        where: {
          idpaciente,
          idprofesional
        },
        include: [{
          model: Paciente,
          as: 'paciente',
          include: [{
            model: Usuario,
            as: 'usuario',
            include: [{
              model: Rol,
              as: 'rol'
            }]
          }]
        }, {
          model: Profesional,
          as: 'profesional',
          include: [{
            model: Usuario,
            as: 'usuario',
            include: [{
              model: Rol,
              as: 'rol'
            }]
          }]
        }
        ]
      });

      if(mensajerias.length != 0){
        return res.status(200).json({ message: 'Ya existe estamensajeria.', mensajeria: mensajerias[0] });
      }

      const mensajeria = await Mensajeria.create({ idpaciente, idprofesional });
  
      return res.status(201).json({mensajeria});
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

  export const getMensajeriasPorPaciente = async (req: Request, res: Response) => {
    const { idpaciente } = req.params;

    try {
        const mensajeriaData: any = []
        const mensajerias = await Mensajeria.findAll({
            where: { idpaciente },
            include: [{
              model: Profesional,
              as: 'profesional',
              include: [{
                model: Usuario,
                as: 'usuario',
                include: [{
                  model: Rol,
                  as: 'rol'
                }]
              }]
            }]
        });

        for (let mensajeria of mensajerias) {
          mensajeriaData.push({
            mensajeria,
            mensajes: await getMensajeFromMensajeria(mensajeria.idmensajeria)
          });
        }

        return res.status(200).json({mensajeriaData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error al obtener las mensajerías.' });
    }
};

export const getMensajeriasPorProfesional = async (req: Request, res: Response) => {
  const { idprofesional } = req.params;
    try {      
          const mensajeriaData: any = []
          const mensajerias = await Mensajeria.findAll({
              where: { idprofesional }
          });
          for (let mensajeria of mensajerias) {
            mensajeriaData.push({
              mensajeria,
              mensajes: await getMensajeFromMensajeria(mensajeria.idmensajeria)
            });
          }
        return res.status(200).json(mensajeriaData);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error al obtener las mensajerías.' });
    }
};
  
