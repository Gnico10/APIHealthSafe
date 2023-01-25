import { Router } from 'express';

import { getRoles, getRol } from "../controllers/roles";

const router = Router();

router.get('/', getRoles);
router.get('/:id', getRol);

export default router;