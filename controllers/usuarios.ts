import {Request, Response} from 'express';
import Usuario from '../models/usuario';
import bcryptjs  from 'bcryptjs';

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json({usuarios});
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario){
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con dni = ${id}`
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const { dni, contrasena, imgperfil } = req.body;

    try {
        // Validaciones
        const existeUsuario = await Usuario.findOne({
            where: {dni}
        });

        if (existeUsuario) {
            return res.status(400).json({
                msg: `El usuario con el DNI = ${dni} ya existe`
            });
        }

        // Creación de instancia en la base de datos.
        const usuario = Usuario.build({ dni, contrasena, imgperfil });

        const salt = await bcryptjs.genSalt();
        usuario.contrasena = bcryptjs.hashSync(contrasena, salt);

        await usuario.save();

        res.json({
            msg:'Usuario dado de alta',
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el usuario.'
        });
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { contrasena } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el DNI = ${id}`
            });
        }

        await usuario.update({contrasena});

        res.json({
            msg:'Usuario actualizado con éxito.',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar el usuario.'
        });
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No existe un usuario con el DNI = ${id}`
            });
        }

        await usuario.destroy();

        res.json({
            msg: 'El ususario fué eliminado con éxito.',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Eliminar el usuario.'
        });
    }
}