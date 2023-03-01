import {Request, Response} from 'express';
import Rol from '../models/rol';

export const getRoles = async (req: Request, res: Response) => {

    try {
        const roles = await Rol.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            roles
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los roles'
        });
    }
}

export const getRol = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const rol = await Rol.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!rol) {
            return res.status(400).json({
                msg: `El rol con id ${id} no existe`
            });
        }

        res.json({
            rol
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar el rol'
        });
    }
}