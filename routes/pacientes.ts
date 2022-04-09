import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getPacientes, getPaciente, postPaciente, putPaciente, deletePaciente } from '../controllers/pacientes';

const router = Router();

router.get('/', getPacientes);
router.get('/:id', getPaciente);

router.post('/', [
    check('dni', 'El dni es requerido.').not().isEmpty(),
    // TODO: Agregar validaciones
    validarCampos
],
postPaciente);

router.put('/:id', putPaciente);

router.delete('/:id', [
    validarJWT
], deletePaciente);


export default router;