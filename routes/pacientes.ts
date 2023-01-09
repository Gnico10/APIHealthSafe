import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getPacientes, getPaciente, postPaciente, deletePaciente } from '../controllers/pacientes';

const router = Router();

router.get('/', getPacientes);
router.get('/:id', getPaciente);

router.post('/', [
    check('idusuario', 'El usuario es requerido.').not().isEmpty(),
    validarCampos
],
postPaciente);


router.delete('/:id', [
    validarJWT
], deletePaciente);


export default router;