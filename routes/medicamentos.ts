import { Router } from 'express';
import { check } from 'express-validator';

import { getMedicamento, getMedicamentos, postMedicamento } from '../controllers/medicamentos';
import validarCampos from '../middlewares/validarCampos';

const router = Router();

router.get('/', getMedicamentos);
router.get('/:id', getMedicamento);
router.post('/', [
    check('nombre', 'El nombre es requerido.').not().isEmpty(),
    check('monodroga', 'La monodroga es requerida.').not().isEmpty(),
    check('presentacion', 'La presentación es requerida.').not().isEmpty(), 
    validarCampos
],
postMedicamento);

export default router;

