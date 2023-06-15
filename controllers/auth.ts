import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT';

import Usuario from '../models/usuario';
import Rol from '../models/rol';
import Paciente from "../models/paciente";
import Profesional from "../models/profesional";

export const login = async (req : Request, res : Response) => {
    const {correo, contrasena} = req.body;

    try {
        // Verificar si el correo existe.
        const usuario : any = await Usuario.findOne({
            where: {correo},
            include: [{
                model: Rol,
                as: 'rol'
            }]
        });
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        // Validar que el usuario tenga un Pacienta signado
        if (usuario.rol.descripcion == 'Paciente'){
            const pacienteDB = await Paciente.findOne({
                where: {idusuario: usuario.idusuario}
            })

            if (!pacienteDB) {
                return res.status(400).json({
                    msg: 'El registro del paciente no finalizó'
                });
            }
        }

        // Validar que el usuario tenga un profesional asignado
        if (usuario.rol.descripcion == 'Profesional'){
            const profesionalDB = await Profesional.findOne({
                where: {idusuario: usuario.idusuario}
            })

            if (!profesionalDB) {
                return res.status(400).json({
                    msg: 'El registro del profesional no finalizó'
                });
            }
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

export const renovarToken = async (req : Request, res : Response) => {
    const {correo} = req.body;

    try {
         // Verificar si el correo existe.
         const usuario : any = await Usuario.findOne({
            where: {correo},
            include: [{
                model: Rol,
                as: 'rol'
            }]
        });
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        // La contraseña no es requerida porque esta ruta está 
        // controlada por un token anterior

        // Generar JWT.
        const token = await generarJWT(usuario.idusuario);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Falló generación de Token renovado'
        });
    }
}
