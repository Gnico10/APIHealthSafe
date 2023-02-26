// routes.ts

import { Router } from 'express';
import MessageController from '../controllers/mensajes';

const router = Router();

router.get('/messages', MessageController.getMessages);
router.post('/messages', MessageController.addMessage);

export default router;
