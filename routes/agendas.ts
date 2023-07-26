import { Router } from 'express';
import { check } from 'express-validator';

import validarCampos from '../middlewares/validarCampos';
import validarJWT from '../middlewares/validarJWT';

import { getAgendas,
         getAgendas_Profesional,
         getAgenda,
         postAgenda,
         deleteAgenda } from '../controllers/agendas';


const router = Router();

router.get('/', getAgendas);
router.get('/:idagenda', getAgenda);
router.get('/profesional/:idprofesional', getAgendas_Profesional);

router.post('/', [
    check('fechadesde', 'La fecha desde es requerida').not().isEmpty(),
    check('fechahasta', 'La fecha hasta es requerida').not().isEmpty(),
    check('horainicio', 'La hora inicio es requerida').not().isEmpty(),
    check('horafin', 'La hora fin es requerida').not().isEmpty(),
    check('duracion', 'La duración es requerido').not().isEmpty(),
    check('precio', 'El precio es requerido').not().isEmpty(),
    check('idprofesional', 'El idprofesional es requerido').not().isEmpty(),
    check('idmodalidad', 'La modalidad es requerida').not().isEmpty(),
    validarCampos,
    //validarJWT
], postAgenda);

router.delete('/:id', [
    validarJWT
], deleteAgenda);


export default router;