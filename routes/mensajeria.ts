import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';

import {  postMensajeria, getMensajerias, getMensajeriasPorPaciente,getMensajeriasPorProfesional } from '../controllers/mensajeria';

const router = Router();

router.get('/', getMensajerias);
router.get('/paciente/:idpaciente', getMensajerias);
router.get('/profesional/idprofesional', getMensajerias);
router.post('/',[
    check('idpaciente', 'El paciente es requerido.').not().isEmpty(),
    check('idprofesional', 'El profesional es requerido.').not().isEmpty(),
    validarCampos
], postMensajeria);


export default router;