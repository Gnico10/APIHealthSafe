import { Router } from 'express';
import { check } from 'express-validator';

import validarJWT from '../middlewares/validarJWT';
import validarCampos from '../middlewares/validarCampos';

import { getMensajes, postMensaje  } from '../controllers/mensajes';

const router = Router();


router.get('/:idmensajeria', getMensajes);
router.post('/',[
    check('mensaje', 'El mensaje es requerido.').not().isEmpty(),
    check('idmensajeria', 'EL idmensajeria es requerido.').not().isEmpty(),
    validarCampos,
    validarJWT
],
postMensaje);

export default router;