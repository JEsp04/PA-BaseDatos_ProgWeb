import express from "express";
import { crearPago } from "../controllers/pagoController.js";
import { recibirWebhook } from "../controllers/webHookController.js";

const router = express.Router();

router.post("/CrearPago", crearPago);
router.post("/Webhook", recibirWebhook);

export default router;
