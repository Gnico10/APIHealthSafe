import {Request, Response} from 'express';

import TituloGrado from '../models/titulogrado';

export const getTitulosGrados = async (req: Request, res: Response) => {

    try {
        const titulosgrado = await TituloGrado.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            titulosgrado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los titutlos de grado.'
        });
    }
}

export const getTituloGrado = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const titulogrado = await TituloGrado.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!titulogrado) {
            return res.status(400).json({
                msg: `El titulo de grado con id ${id} no existe`
            });
        }

        res.json({
            titulogrado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el titulo de grado'
        });
    }
}