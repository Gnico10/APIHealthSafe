import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getAntecedentes_Paciente, postAntecedente } from '../controllers/antecedentes';

const router = Router();

router.get('/paciente/:id', getAntecedentes_Paciente);

router.post('/', [
    check('idtipoantecedente', 'El idtipoantecedente es requerido.').not().isEmpty(),
    check('idpaciente', 'El idpaciente es requerido.').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida.').not().isEmpty(),
    validarCampos,
    validarJWT
], postAntecedente);

export default router;