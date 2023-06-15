import { isJSDocUnknownTag } from "typescript";
import jwt, { Secret } from 'jsonwebtoken';

import Usuario from "../models/usuario";

export const generarJWT = ( idusuario : number ) => {
    return new Promise(async (Resolve : any, Reject : any) => {
        const usuarioDB = await Usuario.findOne({
            where: {idusuario}
        })

        if (!usuarioDB){
            Reject('Usuario no encontrado');
        }

        const payload = { idusuario };
        const secretOrPrivateKey : Secret = process.env.SECRETORPRIVATEKEY!;

        jwt.sign(payload, secretOrPrivateKey, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                Reject('No se pudo generar el token');
            } else {
                Resolve(token);
            }
        });
    }); 
}