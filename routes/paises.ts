import { Router } from 'express';

import { getPaises, getPais } from "../controllers/paises";

const router = Router();

router.get('/', getPaises);
router.get('/:id', getPais);

export default router;