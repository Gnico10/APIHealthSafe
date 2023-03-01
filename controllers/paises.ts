import {Request, Response} from 'express';
import Pais from '../models/pais';

export const getPaises = async (req: Request, res: Response) => {

    try {
        const paises = await Pais.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            paises
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los paises'
        });
    }
}

export const getPais = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pais = await Pais.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!pais) {
            return res.status(400).json({
                msg: `El pais con id ${id} no existe.`
            });
        }

        res.json({
            pais
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el pais'
        });
    }
}