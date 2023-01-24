import {Router} from 'express';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { login, renovarToken } from '../controllers/auth';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *    post:
 *      tags:
 *        - 'Auth'
 *      summary: Iniciar sesión
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                $ref: '#/components/schemas/Usuario'
 *        responses:
 *          '200':
 *            description: Usuario logueado
 */

router.post('/login', [
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('contrasena', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
], login);

router.post('/renovartoken', [
    check('correo', 'El correo es requerido').not().isEmpty(),
    validarCampos,
], renovarToken)

export default router;