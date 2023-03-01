import {Request, Response} from 'express';
import ColegioMedico from '../models/colegiomedico';
import Pais from '../models/pais';

export const getColegiosMedicos = async (req: Request, res: Response) => {

    try {
        const colegiomedico = await ColegioMedico.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include:[{
                model: Pais,
                as: 'pais',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        res.json({
            colegiomedico
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los colegios medicos'
        });
    }
}

export const getColegioMedico = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const colegiomedico = await ColegioMedico.findByPk(id, {
            include:[{
                model: Pais,
                as: 'pais'
            }]
        });

        if (!colegiomedico) {
            return res.status(400).json({
                msg: `El colegio medico con id ${id} no existe.`
            });
        }

        res.json({
            colegiomedico
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el colegio medico'
        });
    }
}