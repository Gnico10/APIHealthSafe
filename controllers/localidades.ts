import {Request, Response} from 'express';

import Localidad from '../models/localidad';

export const getLocalidades = async (req: Request, res: Response) => {

    try {
        const localidades = await Localidad.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            localidades
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las localidades'
        });
    }
}

export const getLocalidad = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const localidad = await Localidad.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!localidad) {
            return res.status(400).json({
                msg: `La localidad con id ${id} no existe.`
            });
        }

        res.json({
            localidad
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar la localidad'
        });
    }
}