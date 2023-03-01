import {Request, Response} from 'express';
import tipomatricula from '../models/tipomatricula';
import TipoMatricula from '../models/tipomatricula';

export const getTiposMatriculas = async (req: Request, res: Response) => {

    try {
        const tiposmatriculas = await TipoMatricula.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            tiposmatriculas
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los tiposmatriculas'
        });
    }
}

export const getTipoMatricula = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const tipomatricula = await TipoMatricula.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!tipomatricula) {
            return res.status(400).json({
                msg: `El tipo matricula con id ${id} no existe`
            });
        }

        res.json({
            tipomatricula
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el tipo matricula'
        });
    }
}