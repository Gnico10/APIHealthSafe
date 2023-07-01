import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';

import { getRegistrosHistoriaClinica,getRegistrosHistoriaClinicaPorPaciente,
    postRegistroHistoriaClinica } from '../controllers/registroshistoriasclinicas';

const router = Router();

router.get('/:idpaciente', getRegistrosHistoriaClinicaPorPaciente);

router.get('/',getRegistrosHistoriaClinica);

router.post('/', [
 
],postRegistroHistoriaClinica);

export default router;