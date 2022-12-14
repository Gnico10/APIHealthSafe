import { Router } from "express";

import validarJWT from "../middlewares/validarJWT";

import { getLocalidades, getLocalidad } from "../controllers/localidades";

const router = Router();

// Only authenticated users can access this routes
router.get("/",/* [validarJWT], */ getLocalidades);
router.get("/:id", /* [validarJWT], */ getLocalidad);


export default router;