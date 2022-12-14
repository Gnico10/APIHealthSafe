import {Request, Response} from "express";
import Direccion from "../models/direccion";

// Get all Direcciones
export const getDirecciones = async (req: Request, res: Response) => {
    const direcciones = await Direccion.findAll();
    res.json({direcciones});
}

// Get a single Localidad by Id
export const getLocalidad = async (req: Request, res: Response) => {
    const { iddireccion } = req.params;
    const direccion = await Direccion.findByPk(iddireccion);

    if (direccion){
        res.json(direccion);
    } else {
        res.status(404).json({
            msg: `No existe una localidad con ID = ${iddireccion}`
        });
    }
}