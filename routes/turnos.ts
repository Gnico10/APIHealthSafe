import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getTurnos,
         getTurnos_Paciente,
         getTurno,
         postTurno,
         deleteTurno } from '../controllers/turnos';

const router = Router();

router.get('/', getTurnos);
router.get('/:idturno', getTurno);
router.get('/paciente/:idpaciente', getTurnos_Paciente);

router.post('/', [
    check('fecha', 'La fecha es requerida').not().isEmpty(), 
    check('horainicio', 'La hora inicio es requerida').not().isEmpty(), 
    check('horafin', 'La hora fin es requerida').not().isEmpty(), 
    check('idpagomercadopago', 'El idpagomercadopago es requerido').not().isEmpty(), 
    check('idagenda', 'El idagenda es requerido').not().isEmpty(), 
    check('idpaciente', 'El idPaciente es requerido').not().isEmpty(), 
    check('idmodalidad', 'El idmodalidad es requerido').not().isEmpty(), 
    validarCampos,
    validarJWT
], postTurno);

router.delete('/:id', [
    validarJWT
], deleteTurno);

export default router;