import { Router } from "express";

import validarJWT from "../middlewares/validarJWT";

import {getEspecialidades, getEspecialidad} from "../controllers/especialidades";

const router = Router();

// Only authenticated users can access this routes
router.get("/",/* [validarJWT], */ getEspecialidades);
router.get("/:id", /* [validarJWT], */ getEspecialidad);


export default router;