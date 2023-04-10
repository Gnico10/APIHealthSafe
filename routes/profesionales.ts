import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getProfesionales, getProfesional, postProfesional } from '../controllers/profesionales';

const router = Router();

router.get('/', getProfesionales); // query params: idespecialidad, codpostal, idmodalidad
router.get('/:id', getProfesional);

router.post('/', [
    check('idusuario', 'El usuario es requerido.').not().isEmpty(),
    check('profesional_matriculas', 'Las matriculas del profesional son requeridos'). not().isEmpty(),
    check('profesional_especialidades', 'Las especialidades del profesional son requeridos').not().isEmpty(),
    validarCampos
], postProfesional);

// router.put('/:id', putProfesional);

// router.delete('/:id', [
//     validarJWT
// ], deleteProfesional);


export default router;