import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT';


export const login = async (req : Request, res : Response) => {
    const {dni, contrasena} = req.body;

    try {
        // Verificar si el DNI existe.
        const usuario : any = await Usuario.findByPk(dni);
        if (!usuario) {
            return res.status(400).json({
                msg: 'DNI o Contraseña incorrectos.'
            });
        }

        // Verificar contrasena.
        const validContrasena = bcryptjs.compareSync(contrasena, usuario.contrasena);
        if (!validContrasena) {
            return res.status(400).json({
                msg: 'DNI o Contraseña incorrectos.'
            });
        }

        // Generar JWT.
        const token = await generarJWT(usuario.dni);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Falló el inicio de sesión.'
        });
    }
}