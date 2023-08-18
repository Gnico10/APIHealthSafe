import { Router } from 'express';
import { check } from 'express-validator';

import { getProfesionalesMatriculas } from '../controllers/profesionalesmatriculas';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

const router = Router();

router.get('/:idprofesional', [
    check('idprofesional', 'el id del profesional es obligatorio').not().isEmpty(),
    validarCampos,
], getProfesionalesMatriculas);

export default router;