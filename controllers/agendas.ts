import {Request, Response} from 'express';
import { Op } from 'sequelize';
import Agenda from '../models/agenda';

import Consultorio from '../models/consultorio';
import Modalidad from '../models/modalidad';
import Profesional from '../models/profesional';
import Turno from '../models/turno';
import Direccion from '../models/direccion';
import Localidad from '../models/localidad';
import Usuario from '../models/usuario';
import Rol from '../models/rol';
import Especialidad from '../models/especialidad';
import Paciente from '../models/paciente';

const includeAgenda = [
    {
        model: Profesional,
        as: 'profesional',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            model: Usuario,
            as: 'usuario',
            include: [{
                model: Rol,
                as: 'rol'
            }]

        }]
    },
    {
        model: Modalidad,
        as: 'modalidad',
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    {
        model: Consultorio,
        as: 'consultorio',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            model: Direccion,
            as: 'direccion',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Localidad,
                as: 'localidad',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }]
        }]
    }
]

//get: all agendas
export const getAgendas = async (req: Request, res: Response) => {
    try {
        const agendas = await Agenda.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: includeAgenda
        });
        res.json({agendas});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las agendas'
        });
    }
}

export const getAgendas_Profesional = async (req: Request, res: Response) => {
    const { idprofesional } = req.params;
    const { fecha } = req.query;

    try {
        const agendas = await Agenda.findAll({
            where: {
                idprofesional
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: includeAgenda
        });

        const fechaturno = fecha? new Date(`${fecha}T00:00:00`) : new Date();
        const agendasWithTurnos = await Promise.all(
            agendas.map(async (agenda) => {
                const turnos = await Turno.findAll({
                    where: { 
                        idagenda: agenda.idagenda,
                        //fecha: { [Op.gte]: fechaturno }
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: Especialidad,
                            as: 'especialidad',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                        }, 
                        {
                            model: Paciente,
                            as: 'paciente',
                            attributes: { exclude: ['createdAt', 'updatedAt'] },
                            include: [{
                                model: Usuario,
                                as: 'usuario',
                                attributes: { exclude: ['createdAt', 'updatedAt'] },
                                include: [{
                                    model: Rol,
                                    as: 'rol',
                                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                                }]
                            }]
                        }
                    ]
                });

                // agrega los turnos como un atributo de cada agenda
                return {
                ...agenda.toJSON(),
                turnos: turnos,
                };
            })
        );

        res.json({agendas: agendasWithTurnos});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las agendas del profesional'
        });
    }
}

//get: una sola agenda por id
export const getAgenda = async (req: Request, res: Response) => {
    const { idagenda } = req.params;

    try {
        const agenda = await Agenda.findByPk(idagenda, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: includeAgenda
        });   
        if (!agenda) {
            res.status(404).json({
                msg: `No existe una agenda con id = ${idagenda}`
            });
        }

        res.json(agenda);
    } catch (error) {
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar la agenda'
        });
    }
}

/*
export const updatedAgenda = async (req: Request, res: Response) => {
    const { precio } = req.params;
    const {idagenda} = req.body;
    const idprofesional = req.params.idprofesional;

    const agenda = await Agenda.findOne({ where: { idagenda }
     });

     if (!agenda) {
      return res.status(404).json({
      msg: `No se encontró ninguna agenda con el ID ${idagenda}.`
         });
     }

      if (agenda.idprofesional !== parseInt(idprofesional)) {
        return res.status(403).json({
        msg: 'No tienes permiso para actualizar esta agenda'
         });
      }

    }   
 */

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
        // Validaciones
        // Si es presencial, cargar consultorio.
        const modalidad = await Modalidad.findByPk(idmodalidad);
        if (modalidad?.descripcion == 'Presencial' && idconsultorio == null){
            return res.status(400).json({
                msg: 'Si la modadalidad es Presencial, se debe cargar un consultorio médico'
            });
        }

        if (!idconsultorio){
            const consultorio = await Consultorio.findByPk(idconsultorio);
            if (consultorio?.idprofesional != idprofesional){
                return res.status(400).json({
                    msg: 'El Consultorio Medico no pertenece al profesional informado'
                }); 
            }
        }
        
        let fechadesdeAgenda = new Date(`${fechadesde}T00:00:00`);
        let fechahastaAgenda = new Date(`${fechahasta}T23:59:59`);
        let fechaActual = new Date();

        if(fechaActual.getTime() > fechadesdeAgenda.getTime() ||
            fechaActual.getTime() > fechahastaAgenda.getTime()) {
            return res.status(400).json({
                msg: 'La fecha ingresada es anterior a la fecha actual, debe ingresar una fecha posterior'
            })
        }

        if(fechadesdeAgenda.getTime() > fechahastaAgenda.getTime()){
            return res.status(400).json({
                msg: 'La fecha desde no puede ser mayor que la fecha hasta'
            })
        }
        
        // Obtener las agendas existentes para la fecha dada y el rango de horarios
        const agendasExistentes = await Agenda.findAll({
            where: {
                [Op.and]: [
                    {
                        horainicio: {[Op.lt]: horafin}, // La hora de inicio debe ser menor que la hora de fin
                        horafin: {[Op.gt]: horainicio} // La hora de fin debe ser mayor que la hora de inicio
                    },
                    {
                        [Op.or]: [
                            {fechadesde: {[Op.between]: [fechadesde, fechahasta]}},
                            {fechahasta: {[Op.between]: [fechadesde, fechahasta]}},
                            {
                                [Op.and]: [{
                                    fechadesde: {[Op.lt]: fechadesde}, // La fecha de inicio debe ser menor que la fecha de inicio buscada
                                    fechahasta: {[Op.gt]: fechahasta} // La fecha de fin debe ser mayor que la fecha de fin buscada
                                }]
                            }
                        ]
                    }
                ]
            }
        });

        if (agendasExistentes.length > 0) {
            return res.status(400).json({
                msg: 'Ya existe una agenda para este rango de fechas y horarios dados'
            }); 
        }

        // Creación de instancia en la base de datos.
        let agenda = null;

        if (!idconsultorio) {
            agenda = await Agenda.create({
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
        } else {
            agenda = await Agenda.create({
                fechadesde,
                fechahasta,
                horainicio,
                horafin,
                duracion,
                precio,
                idprofesional,
                idmodalidad,
            });
        }

        const agendaDB = await Agenda.findByPk( agenda.idagenda, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: includeAgenda
        });

        res.json({
            msg:'agenda dada de alta',
            agenda: agendaDB
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear la agenda'
        });
    }

}


export const deleteAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // validar que exista la agenda
        const agenda = await Agenda.findByPk(id);
        if (!agenda) {
            return res.status(404).json({
                msg: `No existe un agenda con el id = ${id}`
            });
        }

        // Validar que no tenga turnos ocupados.
        const turnos = await Turno.findAll({
            where: {idagenda: agenda.idagenda}
        })
        console.log(turnos)
        if (turnos.length > 0) {
            return res.status(404).json({
                msg: 'No se puede eliminar una agenda con turnos ocupados'
            });
        }

        await agenda.destroy();

        res.json({
            msg: 'La agenda fué eliminado con éxito',
            agenda
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar la agenda'
        });
    }
}

  