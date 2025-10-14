import express from "express";
import perfumeRoutes from "./routes/perfumeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/perfumes", perfumeRoutes);

app.use("/api/usuarios", userRoutes);

app.use("/api/auth", authRoutes);
export default app;
