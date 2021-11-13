import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';


const router = Router();

/**
 * @swagger
 * components:
 *     schemas:
 *         Usuario:
 *             type: object
 *             properties:
 *                dni:
 *                    type: number
 *                    description: El DNI del usuario
 *                contrasena:
 *                    type: string
 *                    description: La contraseña del usuario
 *                imgperfil:
 *                    type: byte
 *                    description: La imagen de perfil del usuario.
 *             required:
 *                 - dni
 *                 - contrasena
 *             example:
 *                 dni: 12345678
 *                 contrasena: 'ABC123456'
 *                 imgperfil: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...'
 */

router.get('/', getUsuarios);
router.get('/:id', getUsuario);

/**
 * @swagger
 * /api/usuarios/:
 *    post:
 *      tags:
 *        - 'Usuarios'
 *      summary: Crea un nuevo usuario
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *      responses:
 *        '201':
 *          description: Usuario creado correctamente
 *        '400':
 *          description: Error en el request
 */
router.post('/', [
    check('dni', 'El DNI es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], postUsuario);

router.post('/', [
    check('dni', 'El dni es requerido.').not().isEmpty(),
    check('contrasena', 'La contrasena es requerida').not().isEmpty(),
    check('contrasena', 'La contraseña debe tener, al menos, 6 caracteres.').isLength({min: 6}),
    check('ispaciente', 'Se debe indicar si el usuario corresponde a un paciente o un profesional').not().isEmpty(),
    validarCampos
],
postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', [
    validarJWT
], deleteUsuario);


export default router;