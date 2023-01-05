import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT';

import Usuario from '../models/usuario';
import rol from '../models/rol';

export const login = async (req : Request, res : Response) => {
    const {correo, contrasena} = req.body;

    try {
        // Verificar si el correo existe.
        const usuario : any = await Usuario.findOne({
            where: {correo},
            include: [{
                model: rol,
                as: 'rol'
            }]
        });
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar contrasena.
        const validContrasena = bcryptjs.compareSync(contrasena, usuario.contrasena);
        if (!validContrasena) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT.
        const token = await generarJWT(usuario.idusuario);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Falló el inicio de sesión'
        });
    }
}