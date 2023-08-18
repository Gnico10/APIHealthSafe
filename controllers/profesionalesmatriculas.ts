import {Request, Response} from 'express';

import ProfesionalMatricula from '../models/profesionalmatricula';
import TipoMatricula from '../models/tipomatricula';
import Universidad from '../models/universidad';
import TituloGrado from '../models/titulogrado';

export const getProfesionalesMatriculas = async (req: Request, res: Response) => {

    const {idprofesional} = req.params
    try {
        const matriculas = await ProfesionalMatricula.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {idprofesional},
            include: [{
                model: TipoMatricula,
                as: 'tipomatricula',
            }, {
                model: Universidad,
                as: 'universidad'
            }, {
                model: TituloGrado,
                as: 'titulogrado'
            }]
        });

        res.json({
            matriculas
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las matriculas del profesional'
        });
    }
}
