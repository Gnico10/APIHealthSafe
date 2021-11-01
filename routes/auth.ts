import {Router} from 'express';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validarCampos';

import { login } from '../controllers/auth';

const router = Router();

router.post('/login', [
    check('dni', 'El dni es requerido').not().isEmpty(),
    check('contrasena', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
],
login);

export default router;