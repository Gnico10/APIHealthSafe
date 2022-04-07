import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getTurnos, getTurno, postTurno, putTurno, deleteTurno } from '../controllers/turnos';


const router = Router();

router.get('/', getTurnos);
router.get('/:id', getTurno);

router.post('/', [
   // check('dni', 'El DNI es obligatorio').not().isEmpty(),
  //  check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
  //  validarCampos
], postTurno);

router.post('/', [
// check('dni', 'El dni es requerido.').not().isEmpty(),
 //   check('contrasena', 'La contrasena es requerida').not().isEmpty(),
 //   check('contrasena', 'La contraseña debe tener, al menos, 6 caracteres.').isLength({min: 6}),
//    check('ispaciente', 'Se debe indicar si el Turno corresponde a un paciente o un profesional').not().isEmpty(),
 //   validarCampos
],
postTurno);
router.put('/:id', putTurno);
router.delete('/:id', [
    validarJWT
], deleteTurno);


export default router;