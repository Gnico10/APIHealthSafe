import {Request, Response} from "express";
import Localidad from "../models/localidad";

// Get all Localidades
export const getLocalidades = async (req: Request, res: Response) => {
    const localidades = await Localidad.findAll({attributes: ['codpostal', 'descripcion']});
    res.json({localidades});
}

// Get a single Localidad by Id
export const getLocalidad = async (req: Request, res: Response) => {
    const { codpostal } = req.params;
    const localidad = await Localidad.findByPk(codpostal, {attributes: ['idespecialidad', 'descripcion']});

    if (localidad){
        res.json(localidad);
    } else {
        res.status(404).json({
            msg: `No existe una localidad con el Código Postal = ${codpostal}`
        });
    }
}