import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import Usuario from '../models/usuario';
import IUsuario from '../interfaces/iUsuario';

const validarJWT = (req : Request, res : Response, next : any) => {
    const token = req.header('Authorization');
    const secretOrPrivateKey : Secret = process.env.SECRETORPRIVATEKEY!;

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        // Sacar propiedad dni del payload.
        const { dni } : IUsuario = (jwt.verify(token, secretOrPrivateKey) as IUsuario);
        const usuario = Usuario.findByPk(dni);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario no existe en la base de datos.'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401). json({
            msg: 'Token no válido.'
        });
    }
}

export default validarJWT;
