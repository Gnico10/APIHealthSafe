import {Router} from 'express';
import { check } from 'express-validator';
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';
import validarCampos from '../middlewares/validarCampos';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', [
    check('dni', 'El dni es requerido.').not().isEmpty(),
    check('contrasena', 'La contrasena es requerida').not().isEmpty(),
    check('contrasena', 'La contraseña debe tener, al menos, 6 caracteres.').isLength({min: 6}),
    check('ispaciente', 'Se debe indicar si el usuario corresponde a un paciente o un profesional').not().isEmpty(),
    validarCampos
],
postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);


export default router;