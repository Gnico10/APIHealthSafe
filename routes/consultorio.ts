import { Router } from 'express';
import { check } from 'express-validator';
import validarJWT from '../middlewares/validarJWT';

import validarCampos from '../middlewares/validarCampos';
import { deleteConsultorio } from '../controllers/consultorios';

import { getConsultorios,
        getConsultoriosProfesional,
        postConsultorio } from "../controllers/consultorios";

const router = Router();

router.get('/', getConsultorios);
router.get('/profesional/:idprofesional', getConsultoriosProfesional);
router.post('/', [
    check('descripcion', 'La descripcion es requerida.').not().isEmpty(),
    check('idprofesional', 'El idprofesional es requerido.'). not().isEmpty(),
    check('direccion', 'La direccion es requerida.').not().isEmpty(),
    validarCampos
], postConsultorio);

router.delete('/:id', [
    validarJWT
], deleteConsultorio);

export default router;