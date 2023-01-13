import {Request, Response} from 'express';
import { generarJWT } from '../helpers/generarJWT';
import Usuario from '../models/usuario';
import bcryptjs  from 'bcryptjs';

import rol from '../models/rol'

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll({
        include: [{
            model: rol,
            as: 'rol'
        }]
    }
    );
    res.json({usuarios});
}

export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id, {
        include: [{
            model: rol,
            as: 'rol'
        }]        
    });

    if (usuario){
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con Id : ${id}`
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const {body} = req;

    try {
        // Validaciones
        const existeUsuario = await Usuario.findOne({
            where: {
                correo: body.correo
            }
        });

        if (existeUsuario) {
            return res.status(400).json({
                msg: `El usuario con el Correo = ${body.correo} ya existe`
            });
        }

        // Creación de instancia en la base de datos.
        const newusuario = Usuario.build(body);

        const salt = await bcryptjs.genSalt();
        newusuario.contrasena = bcryptjs.hashSync(body.contrasena, salt);
        await newusuario.save();
        
        const usuario : any = await Usuario.findOne({
            where: {
                correo: body.correo
            },
            include: [{
                model: rol,
                as: 'rol'
            }]
        });

        // Generar JWT.
        const token = await generarJWT(usuario.idusuario);
        
        res.json({
            msg:'Usuario dado de alta',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el usuario.'
        });
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { correo, contrasena } = req.body;

    try {
        const usuario = await Usuario.findOne({
            where: {correo}
        });
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el Correo : ${correo}`
            });
        }

        const salt = await bcryptjs.genSalt();
        let nuevacontrasena = bcryptjs.hashSync(contrasena, salt);
        await usuario.update({
            contrasena: nuevacontrasena
        });

        res.json({
            msg:'Usuario actualizado con éxito.',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo actualizar el usuario.'
        });
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el id : ${id}`
            });
        }

        await usuario.destroy();

        res.json({
            msg: 'El usuario fué eliminado con éxito.',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo eliminar el usuario.'
        });
    }
}