import { Router } from 'express';
import { getMensajes, postMensaje  } from '../controllers/mensajes';

const router = Router();


router.post('/', postMensaje);
router.get('/:idmensajeria', getMensajes);

export default router;