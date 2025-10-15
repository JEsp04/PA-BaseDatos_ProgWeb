import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrdenDetalles = sequelize.define("OrdenDetalles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ordenId : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, { tableName: 'orden_detalles',
  timestamps: true,
});

export default OrdenDetalles;