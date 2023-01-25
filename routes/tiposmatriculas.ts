import { Router } from 'express';

import { getTiposMatriculas, getTipoMatricula } from "../controllers/tiposmatriculas";

const router = Router();

router.get('/', getTiposMatriculas);
router.get('/:id', getTipoMatricula);

export default router;