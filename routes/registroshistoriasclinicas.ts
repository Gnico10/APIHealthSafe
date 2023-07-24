import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';

import { getRegistrosHistoriaClinica,getRegistrosHistoriaClinicaPorPaciente,
    postRegistroHistoriaClinica } from '../controllers/registroshistoriasclinicas';

const router = Router();

router.get('/',getRegistrosHistoriaClinica);
router.get('/paciente/:idpaciente', getRegistrosHistoriaClinicaPorPaciente);
router.post('/', [
    check('idpaciente', 'El idpaciente es requerido.').not().isEmpty(),
    check('diagnosticos', 'El diagnosticos es requerido.').not().isEmpty(),
    validarCampos
],postRegistroHistoriaClinica);

export default router;