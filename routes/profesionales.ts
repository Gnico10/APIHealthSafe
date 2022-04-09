import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getProfesionales, getProfesional, postProfesional, putProfesional, deleteProfesional } from '../controllers/profesionales';

const router = Router();

router.get('/', getProfesionales);
router.get('/:id', getProfesional);

router.post('/', [
    check('dni', 'El dni es requerido.').not().isEmpty(),
    // TODO: Agregar validaciones
    validarCampos
],
postProfesional);

router.put('/:id', putProfesional);

router.delete('/:id', [
    validarJWT
], deleteProfesional);


export default router;