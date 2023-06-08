import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';

import { getRegistrosHistoriaClinica, getRegistroHistoriaClinica, postRegistroHistoriaClinica } from '../controllers/registros_historiasClinicas';

const router = Router();

router.get('/:idPaciente', getRegistroHistoriaClinica);

router.get('/',getRegistrosHistoriaClinica);

router.post('/', [
 
],postRegistroHistoriaClinica);

export default router;