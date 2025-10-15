import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Orden = sequelize.define("Orden", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'procesando', 'completada', 'cancelada')
},
},{ tableName: 'ordenes',
  timestamps: true,
});

export default Orden;