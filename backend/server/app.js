import express from "express";

const app = express();

app.use(express.json());

import perfumeRoutes from "./routes/perfumeRoutes.js";
app.use("/api/perfumes", perfumeRoutes);


export default app;
