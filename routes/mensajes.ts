import { Router } from 'express';
import { check } from 'express-validator';

import validarJWT from '../middlewares/validarJWT';
import validarCampos from '../middlewares/validarCampos';

import { getMensajes, postMensaje  } from '../controllers/mensajes';

const router = Router();


router.get('/:idmensajeria', getMensajes);
router.post('/',[
    check('idmensajeria', 'El idmensajeria es requerido.').not().isEmpty(),
    check('mensaje', 'El mensaje es requerido.').not().isEmpty(),
    check('rolemisor', 'El rolemisor es requerido.').not().isEmpty(),
    check('idemisor', 'El idemisor es requerido.').not().isEmpty(),
    check('tipomensaje', 'El tipomensaje es requerido.').not().isEmpty(),
    validarCampos,
    validarJWT
],
postMensaje);

export default router;