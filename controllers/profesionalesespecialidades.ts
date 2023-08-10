import {Request, Response} from 'express';

import Especialidad from '../models/especialidad';
import ColegioMedico from '../models/colegiomedico';
import Profesional from '../models/profesional';
import ProfesionalEspecialidad from '../models/especialidadprofesional';
import Pais from '../models/pais';

export const postProfesionalEspecialidades = async (req: Request, res: Response) => {
    const { aniootorgamiento,
            idprofesional,
            idespecialidad,
            idcolegiomedico } = req.body;
    
    try {
        // Validations
        // Validate idprofesional
        const existeProfesional = await Profesional.findByPk(idprofesional);

        if (!existeProfesional) {
            return res.status(400).json({
                msg: `El Profesional con el ID = ${idprofesional} no existe`
            });
        }

        // Validate idespecialidad
        let existeEspecialidad = await Especialidad.findByPk(idespecialidad);
        if (!existeEspecialidad) {
            return res.status(400).json({
                msg: `La especialidad con id ${idespecialidad} no existe`
            });
        }

        let existeColegioMedico = await ColegioMedico.findByPk(idcolegiomedico);
        if (!existeColegioMedico) {
            return res.status(400).json({
                msg: `El Colegio Medico con id ${idcolegiomedico} no existe`
            });
        }

        // Validar si el profesional ya tiene la especialidad ingresada.
        let existeProfesionalEspecialidad = await ProfesionalEspecialidad.findAll({
            where: {idprofesional, idespecialidad}
        });

        if (existeProfesionalEspecialidad.length != 0) {
            return res.status(400).json({
                msg: `La especialidad con id ${idespecialidad} ya está asignado al profesional con id ${idprofesional}`
            });
        }

        // Create profesional_especialidad relation
        await ProfesionalEspecialidad.create({
            aniootorgamiento,
            idprofesional,
            idespecialidad,
            idcolegiomedico
        });

        const profesional_especialidad = await ProfesionalEspecialidad.findByPk(idprofesional, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: Especialidad,
                    as: 'especialidad',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                },
                {
                    model: ColegioMedico,
                    as: 'especialidad',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Pais,
                        as: 'pais',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }]
                },
            ]
        })

        res.json({
            msg: `El profesional con el id ${idprofesional} se ha asociado a la especialidad con el id ${idespecialidad}`,
            profesional_especialidad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se ha podido crear la relación.'
        });
    }
}