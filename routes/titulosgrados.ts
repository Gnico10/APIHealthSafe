import { Router } from 'express';

import { getTituloGrado, getTitulosGrados } from '../controllers/titulogrado';

const router = Router();

router.get('/', getTitulosGrados);
router.get('/:id', getTituloGrado);

export default router;