import {Request, Response} from 'express';
import Especialidad from '../models/especialidad';
import Profesional from '../models/profesional';
import Profesionales_Especialidades from '../models/profesionales_especialidades';

export const postProfesionalEspecialidades = async (req: Request, res: Response) => {
    const { idprofesional,
            idespecialidad } = req.body;
    
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
        const existeEspecialidad = await Especialidad.findByPk(idespecialidad);

        if (!existeEspecialidad) {
            return res.status(400).json({
                msg: `La Especialidad con el ID = ${idespecialidad} no existe`
            });
        }

        // Create profesional_especialidad relation
        const profesional_especialidad = await Profesionales_Especialidades.build({
            idprofesional,
            idespecialidad
        });

        await profesional_especialidad.save();
        
        res.json({
            msg: `El profesional con el ID = ${idprofesional} se ha asociado a la especialidad con el ID = ${idespecialidad}`,
            profesional_especialidad
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se ha podido crear la relación'
        });
    }
}