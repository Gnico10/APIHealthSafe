import {Request, Response} from 'express';
import Agenda from '../models/agenda';

import Consultorio from '../models/consultorio';
import Modalidad from '../models/modalidad';
import Profesional from '../models/profesional';


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
        // Validaciones
        // Si es presencial, cargar consultorio.
        const modalidad = await Modalidad.findByPk(idmodalidad);
        if (modalidad?.descripcion == 'Presencial' && idconsultorio == null){
            return res.status(400).json({
                msg: 'Si la modadalidad es Presencial, se debe cargar un consultorio médico.'
            });
        }

        if (idconsultorio != null){
            const consultorio = await Consultorio.findByPk(idconsultorio);
            if (consultorio?.idprofesional != idprofesional){
                return res.status(400).json({
                    msg: 'El Consultorio Medico no pertenece al profesional informado.'
                }); 
            }
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