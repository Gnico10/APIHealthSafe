import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getAgendas, getAgenda, postAgenda, deleteAgenda } from '../controllers/agendas';


const router = Router();

router.get('/', getAgendas);

router.get('/:id', getAgenda);

router.post('/', [
    // TODO: Agregar validaciones
], postAgenda);

router.delete('/:id', [
    validarJWT
], deleteAgenda);


export default router;