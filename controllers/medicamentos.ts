import {Request, Response} from 'express';

import Medicamento from '../models/medicamento';


export const postMedicamento = async (req: Request, res: Response) => {
    const {
        nombre,
        monodroga,      
    } = req.body;

    try {
       
        // Creación del paciente
       const medicamento = await Medicamento.create({
            nombre,
            monodroga,
        });
        res.json({
            msg:'Se creó el medicamento correctamente',
            medicamento   
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el medicamento'
        });
    }
}

export const getMedicamento = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const medicamento = await Medicamento.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!medicamento) {
            return res.status(400).json({
                msg: `El medicamento con id ${id} no existe.`
            });
        }

        res.json({
            medicamento
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el medicamento'
        });
    }
}

export const getMedicamentos = async (req: Request, res: Response) => {

    try {
        const medicamentos = await Medicamento.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            medicamentos
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los medicamentos'
        });
    }
}