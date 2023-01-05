import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validarCampos = (req: Request, res: Response, next : any) => {
    //Validate that all fields.
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
}

export default validarCampos;