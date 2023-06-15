import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { postProfesionalEspecialidades } from '../controllers/prefesionales_especialidades';


const router = Router();

router.post('/', [
    check('idprofesional', 'El idprofesional es requerido.').not().isEmpty(),
    check('idespecialidad', 'El idespecialidad es requerida.').not().isEmpty(),
    check('idcolegiomedico', 'El idcolegomedico es requerido.').not().isEmpty(),
    check('aniootorgamiento', 'El aniootorgamiento es requerido.').not().isEmpty(),
    validarCampos
],
postProfesionalEspecialidades);

export default router;