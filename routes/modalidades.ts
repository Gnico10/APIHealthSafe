import { Router } from 'express';

import { getModalidad, getModalidades } from '../controllers/modalidades';

const router = Router();

router.get('/', getModalidades);
router.get('/:id', getModalidad);

export default router;