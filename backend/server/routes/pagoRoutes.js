import { Router } from "express";
import { 
    crearPago, 
    obtenerPagos,
    obtenerPagoPorId,
    actualizarPago, 
    eliminarPago } from "../controllers/pagoController.js";

const router = Router();

router.post("/crear", crearPago);
router.get("/obtener", obtenerPagos);
router.put("/obtenerPor/:id", obtenerPagoPorId);
router.patch("/actualizar/:id", actualizarPago);
router.delete("/eliminar/:id", eliminarPago);

export default router;