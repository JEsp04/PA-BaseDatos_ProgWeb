import express from "express";
import {
  crearPerfume,
  obtenerPerfumes,
  obtenerPerfumePorId,
  actualizarPerfume,
  eliminarPerfume,
} from "../controllers/perfumeController.js";

const router = express.Router();

router.post("/", crearPerfume);
router.get("/", obtenerPerfumes);
router.get("/:id", obtenerPerfumePorId);
router.patch("/:id", actualizarPerfume);
router.delete("/:id", eliminarPerfume);

export default router;
