import {Request, Response} from 'express';

import Profesional from '../models/profesional';
import Direccion from '../models/direccion';
import Consultorio from '../models/consultorio';
import Localidad from '../models/localidad';

const include_consultorio = [
    {
        model: Direccion,
        as: 'direccion',
        include: [{
            model: Localidad,
            as: 'localidad',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    }
]

export const getConsultorios = async (req: Request, res: Response) => {
  try {
    const consultorios = await Consultorio.findAll({
        include: include_consultorio,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.json({
        consultorios
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error interno. No se pudo obtener los consultorios.',
    });
  }
};


export const getConsultoriosProfesional = async (req: Request, res: Response) => {
  const { idprofesional } = req.params;

  try {
    const consultorio = await Consultorio.findAll({
      where: { idprofesional },
      include: include_consultorio,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json({
        consultorio
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error interno. No se pudo obtener los consultorios.',
    });
  }
};

export const postConsultorio = async (req: Request, res: Response) => {
    const { descripcion,
            numeroConsultorio,
            idprofesional,
            direccion } = req.body;
  
    try {
      // Validar que el profesional exista
      const profesional = await Profesional.findByPk(idprofesional);
      if (!profesional) {
        return res.status(404).json({
          msg: `El profesional con id ${idprofesional} no existe`,
        });
      }

      // Crear la dirección
      const newDireccion = await Direccion.create(direccion);

      // Crear Consultorio
      const newConsultorio = await Consultorio.create({
        descripcion,
        numeroConsultorio,
        idprofesional,
        iddireccion: newDireccion.iddireccion
      });

      const consultorioDB = await Consultorio.findByPk(newConsultorio.idconsultorio, {
        include: include_consultorio,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      
      res.json({
        msg: 'Consultorio creado correctamente.',
        consultorio: consultorioDB 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error interno. No se pudo crear el consultorio.',
      });
    }
  };
