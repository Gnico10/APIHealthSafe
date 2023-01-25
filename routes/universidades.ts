import { Router } from 'express';

import { getUniversidades, getUniversidad } from "../controllers/universidades";

const router = Router();

router.get('/', getUniversidades);
router.get('/:id', getUniversidad);

export default router;