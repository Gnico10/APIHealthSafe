import { Router } from 'express';

import { getColegiosMedicos, getColegioMedico } from "../controllers/colegiosmedicos";

const router = Router();

router.get('/', getColegiosMedicos);
router.get('/:id', getColegioMedico);

export default router;