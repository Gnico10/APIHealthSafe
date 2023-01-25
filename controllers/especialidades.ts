import {Request, Response} from "express";
import Especialidad from "../models/especialidad";

// Get all Especialidades
export const getEspecialidades = async (req: Request, res: Response) => {
    try {
        const especialidades = await Especialidad.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({especialidades});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar las especialidades.'
        });
    }
}

// Get a single Especialidad by Id
export const getEspecialidad = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const especialidad = await Especialidad.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!especialidad) {
            return res.status(400).json({
                msg: `La especialidad con id ${id} no existe.`
            });
        }

        res.json({
            especialidad
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar la especialidad.'
        });
    }
}