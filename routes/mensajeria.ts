import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';

import {  postMensajeria, getMensajerias} from '../controllers/mensajeria';

const router = Router();

//query params: idpaciente , idprofesional
router.get('/', getMensajerias); 

router.post('/',[
    check('idpaciente', 'El paciente es requerido.').not().isEmpty(),
    check('idprofesional', 'El profesional es requerido.').not().isEmpty(),
    validarCampos
], postMensajeria);


export default router;