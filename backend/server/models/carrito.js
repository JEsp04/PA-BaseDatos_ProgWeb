import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Carrito = sequelize.define("Carrito", {
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
},{ tableName: 'carritos',
  timestamps: true,
});

export default Carrito;