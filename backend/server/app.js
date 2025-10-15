import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/productos", productRoutes);

app.use("/api/usuarios", userRoutes);

app.use("/api/auth", authRoutes);
export default app;
