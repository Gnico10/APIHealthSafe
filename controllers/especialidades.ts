import {Request, Response} from "express";
import Especialidad from "../models/especialidad";

// Get all Especialidades
export const getEspecialidades = async (req: Request, res: Response) => {
    const especialidades = await Especialidad.findAll({attributes: ['idespecialidad', 'descripcion']});
    res.json({especialidades});
}

// Get a single Especialidad by Id
export const getEspecialidad = async (req: Request, res: Response) => {
    const { id } = req.params;
    const especialidad = await Especialidad.findByPk(id, {attributes: ['idespecialidad', 'descripcion']});

    if (especialidad){
        res.json(especialidad);
    } else {
        res.status(404).json({
            msg: `No existe una especialidad con ID = ${id}`
        });
    }
}