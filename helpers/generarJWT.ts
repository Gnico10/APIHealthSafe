import { isJSDocUnknownTag } from "typescript";
import jwt, { Secret } from 'jsonwebtoken';

export const generarJWT = ( dni : number ) => {
    return new Promise((Resolve : any, Reject : any) => {
        const payload = { dni };
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