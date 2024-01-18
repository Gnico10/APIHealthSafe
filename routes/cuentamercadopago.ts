import { Router } from 'express';

import {postCuentaMercadoPago, getCuentaMercadoPago, putCuentaMercadoPago } from '../controllers/cuentamercadopago';

const router = Router();

router.post('/:idprofesional', postCuentaMercadoPago)
router.get('/:idprofesional', getCuentaMercadoPago);
router.put('/:idcuentamercadopago', putCuentaMercadoPago);

export default router;