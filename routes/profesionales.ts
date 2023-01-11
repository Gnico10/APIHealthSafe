import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getProfesionales, postProfesional } from '../controllers/profesionales';

const router = Router();

router.get('/', getProfesionales);
// router.get('/:id', getProfesional);

router.post('/', [
    check('idusuario', 'El usuario es requerido.').not().isEmpty(),
    validarCampos
], postProfesional);

// router.put('/:id', putProfesional);

// router.delete('/:id', [
//     validarJWT
// ], deleteProfesional);


export default router;