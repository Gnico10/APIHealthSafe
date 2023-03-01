import {Request, Response} from 'express';
import Modalidad from '../models/modalidad';

export const getModalidades = async (req: Request, res: Response) => {

    try {
        const modalidades = await Modalidad.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            modalidades
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las modalidades'
        });
    }
}

export const getModalidad = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const modalidad = await Modalidad.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!modalidad) {
            return res.status(400).json({
                msg: `La modalidad con id ${id} no existe.`
            });
        }

        res.json({
            modalidad
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar la modalidad'
        });
    }
}