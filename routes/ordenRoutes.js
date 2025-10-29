import { Router } from "express";

import {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenPorId,
    eliminarOrden,
} from "../controllers/ordenController.js";

const router = Router();

router.post("/crear", crearOrden);
router.get("/obtener", obtenerOrdenes);
router.get("/obtenerPor/:id", obtenerOrdenPorId);
router.delete("/eliminar/:id", eliminarOrden);

export default router;