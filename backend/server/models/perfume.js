import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Perfume = sequelize.define("Perfume", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
  },{
    tableName: 'perfumes',
  }
);

export default Perfume;
