import { Router } from 'express';

import {  postMensajeria, getMensajerias } from '../controllers/mensajeria';

const router = Router();

router.get('/', getMensajerias);
router.post('/', postMensajeria);


export default router;