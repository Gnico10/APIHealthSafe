import { Router } from 'express';

import { getTipoAntecedente, getTiposAntecedente } from '../controllers/tiposantecedentes';

const router = Router();

router.get('/', getTiposAntecedente);
router.get('/:id', getTipoAntecedente);

export default router;