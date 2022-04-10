import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getTurnos, getTurno, postTurno, putTurno, deleteTurno } from '../controllers/turnos';


const router = Router();

router.get('/', getTurnos);

router.get('/:id', getTurno);

router.post('/', [
    // TODO: Agregar validaciones
], postTurno);

router.post('/', [
    // TODO: Agregar validaciones
],
postTurno);



router.put('/:id', putTurno);
router.delete('/:id', [
    validarJWT
], deleteTurno);


export default router;