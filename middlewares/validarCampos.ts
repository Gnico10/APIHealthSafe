import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validarCampos = (req: Request, res: Response, next : any) => {
    //Validaciones de loscamposd de Usuarios.
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
}

export default validarCampos;