import { Router } from 'express';


import { getTipoIndicacionGeneral, getTiposIndicacionesGenerales } from '../controllers/tiposindicacionesgenerales';

const router = Router();

router.get('/', getTiposIndicacionesGenerales );
router.get('/:id', getTipoIndicacionGeneral);


export default router;
