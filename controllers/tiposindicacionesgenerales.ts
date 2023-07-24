import {Request, Response} from 'express';

import  Tipoindicaciongeneral from '../models/tipoindicaciongeneral';


export const getTipoIndicacionGeneral = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const tipoindicaciongeneral = await Tipoindicaciongeneral.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!tipoindicaciongeneral) {
            return res.status(400).json({
                msg: `El tipo de indicación general con id ${id} no existe.`
            });
        }

        res.json({
            tipoindicaciongeneral
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el tipo de indicación de general'
        });
    }
}

export const getTiposIndicacionesGenerales = async (req: Request, res: Response) => {

    try {
        const tiposindicacionesgenerales = await Tipoindicaciongeneral.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            tiposindicacionesgenerales
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los tipos de indicaciones generales'
        });
    }
}