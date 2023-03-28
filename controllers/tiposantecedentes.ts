import {Request, Response} from 'express';

import TipoAntecedente from '../models/tipoantecedente';

export const getTiposAntecedente = async (req: Request, res: Response) => {

    try {
        const tiposantecedente = await TipoAntecedente.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            tiposantecedente
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los tipos antecedente'
        });
    }
}

export const getTipoAntecedente = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const tipoantecedente = await TipoAntecedente.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!tipoantecedente) {
            return res.status(400).json({
                msg: `El tipo antecedente con id ${id} no existe`
            });
        }

        res.json({
            tipoantecedente
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el tipo antecedente'
        });
    }
}