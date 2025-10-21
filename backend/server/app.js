import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";
import carritoDetalleRoutes from "./routes/carritoDetalleRoutes.js";
import ordenRoutes from "./routes/ordenRoutes.js";
import detallesOrdenRoute from "./routes/detallesOrdenRoute.js";
import pagoRoute from "./routes/pagoRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/productos", productRoutes);

app.use("/api/usuarios", userRoutes);

app.use("/api/usuarios/auth", authRoutes);

app.use("/api/carritos", carritoRoutes);

app.use("/api/carritos/detalles", carritoDetalleRoutes);

app.use("/api/ordenes", ordenRoutes);

app.use("/api/ordenes/detalles", detallesOrdenRoute);

app.use("/api/pagos", pagoRoute);

export default app;
