import { Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import Usuario from '../models/usuario';

const validarJWT = async (req : any, res : Response, next : any) => {
    const token = req.header('Authorization');
    const secretOrPrivateKey : Secret = process.env.SECRETORPRIVATEKEY!;

    if (!token) {
        return res.status(401).json({
            msg: 'El token es requerido en la petición'
        });
    }

    try {
        // search usuario in db
        const {idusuario} = (jwt.verify(token, secretOrPrivateKey) as any);
        const usuario = await Usuario.findByPk(idusuario);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token inválido - Usuario no existe en la base de datos.'
            });
        }
        
        req.idUsuarioToken = idusuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401). json({
            msg: 'Token no válido.'
        });
    }
}

export default validarJWT;
