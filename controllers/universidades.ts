import {Request, Response} from 'express';
import Universidad from '../models/universidad';
import Pais from '../models/pais';

export const getUniversidades = async (req: Request, res: Response) => {

    try {
        const universidades = await Universidad.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include:[{
                model: Pais,
                as: 'pais',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        res.json({
            universidades
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las universidades.'
        });
    }
}

export const getUniversidad = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const universidad = await Universidad.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include:[{
                model: Pais,
                as: 'pais',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        if (!universidad) {
            return res.status(400).json({
                msg: `La universidad con id ${id} no existe.`
            });
        }

        res.json({
            universidad
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar la universidad.'
        });
    }
}