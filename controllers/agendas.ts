import {Request, Response} from 'express';
import Agenda from '../models/agenda';

import Consultorio from '../models/consultorio';
import Modalidad from '../models/modalidad';
import Profesional from '../models/profesional';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//get: all agendas
export const getAgendas = async (req: Request, res: Response) => {
    const agendas = await Agenda.findAll({
        include: [
            {
                model: Profesional,
                as: 'profesional',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: Modalidad,
                as: 'modalidad',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: Consultorio,
                as: 'consultorio',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ]
    });
    res.json({agendas});
}

//get: una sola agenda por id
export const getAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;
    const agenda = await Agenda.findByPk(id, {
        include: [
            {
                model: Profesional,
                as: 'profesional',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: Modalidad,
                as: 'modalidad',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: Consultorio,
                as: 'consultorio',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ]
    });

    if (agenda){
        res.json(agenda);
    } else {
        res.status(404).json({
            msg: `No existe una agenda con id = ${id}`
        });
    }
}
export const postAgenda = async (req: Request, res: Response) => {
    const {
        fechadesde,
        fechahasta,
        horainicio,
        horafin,
        duracion,
        precio,
        idprofesional,
        idmodalidad,
        idconsultorio
    } = req.body;

    try {
        
        let fechadesdeAgenda = new Date(fechadesde);
        let fechahastaAgenda = new Date(fechahasta);
        let  fechaActual = new Date();
            console.log(fechaActual);
            if(fechaActual.getTime() > fechadesdeAgenda.getTime() ||
               fechaActual.getTime() > fechahastaAgenda.getTime()) {
                return res.status(400).json({
                    msg: 'La fecha ingresada es anterior a la fecha actual, debe ingresar una fecha posterior'
                })
    
            } 
             // Obtener las agendas existentes para la fecha dada y el rango de horarios
             const agendasExistentes = await Agenda.findAll({
                where: {
                  [Op.and]: [
                    {
                      horainicio: {
                        [Op.lt]: horafin // La hora de inicio debe ser menor que la hora de fin
                      },
                      horafin: {
                        [Op.gt]: horainicio // La hora de fin debe ser mayor que la hora de inicio
                      }
                    },
                    {
                      [Op.or]: [
                        {
                          fechadesde: {
                            [Op.between]: [fechadesde, fechahasta]
                          }
                        },
                        {
                          fechahasta: {
                            [Op.between]: [fechadesde, fechahasta]
                          }
                        },
                        {
                          [Op.and]: [
                            {
                              fechadesde: {
                                [Op.lt]: fechadesde // La fecha de inicio debe ser menor que la fecha de inicio buscada
                              },
                              fechahasta: {
                                [Op.gt]: fechahasta // La fecha de fin debe ser mayor que la fecha de fin buscada
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              });
              
            
              // Comprobar si existen turnos para el rango de horarios
              if (agendasExistentes.length > 0) {
                  return res.status(400).json({
                      msg: 'Ya existe una agenda para este rango de fechas y horarios dados'
                   }); 
              }
        // Creación de instancia en la base de datos.
        const agenda = Agenda.build({
            fechadesde,
            fechahasta,
            horainicio,
            horafin,
            duracion,
            precio,
            idprofesional,
            idmodalidad,
            idconsultorio
        });

        await agenda.save();

        const agendaDB = Agenda.findOne({
            where: {idagenda: agenda.idagenda},
            include: [
                {
                    model: Profesional,
                    as: 'profesional',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Modalidad,
                    as: 'modalidad',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Consultorio,
                    as: 'consultorio',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });

        res.json({
            msg:'agenda dada de alta',
            agenda: agendaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear la agenda.'
        });
    }

}


export const deleteAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const agenda = await Agenda.findByPk(id);
        if (!agenda) {
            return res.status(404).json({
                msg: `No existe un agenda con el id = ${id}`
            });
        }

        await agenda.destroy();

        res.json({
            msg: 'La agenda fué eliminado con éxito.',
            agenda
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar la agenda.'
        });
    }
}

  