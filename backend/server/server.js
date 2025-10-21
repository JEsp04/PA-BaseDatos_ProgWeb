import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/index.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos.");

    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados con la base de datos.");

    app.listen(PORT, () =>
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

startServer();
