import { Router } from 'express';
import { crearMensajeria, enviarMensaje, obtenerMensajes } from '../controllers/mensajes';

const router = Router();

router.post('/mensajeria', crearMensajeria);
router.post('/mensaje', enviarMensaje);
router.get('/mensajes/:idmensajeria', obtenerMensajes);

export default router;