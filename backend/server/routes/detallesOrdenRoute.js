import { Router } from "express";
import {
    crearDetalleOrden,
    obtenerDetallesOrden,
    obtenerDetalleOrdenPorId,
    actualizarDetalleOrden,
    eliminarDetalleOrden,            
} from "../controllers/detalleOrdenController.js";

const router = Router();

router.post("/crear", crearDetalleOrden);
router.get("/obtener", obtenerDetallesOrden);
router.get("/obtenerPor/:id", obtenerDetalleOrdenPorId);
router.patch("/actualizar/:id", actualizarDetalleOrden);
router.delete("/eliminar/:id", eliminarDetalleOrden);

export default router;