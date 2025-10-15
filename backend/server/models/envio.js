import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Envio = sequelize.define("Envio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ordenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccionEnvio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    codigoPostal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadoEnvio: {
    type: DataTypes.ENUM('pendiente', 'enviado', 'entregado', 'cancelado'),
    allowNull: false,
  },
    fechaEnvio: {
    type: DataTypes.DATE,
    allowNull: false,
    },
    fechaEntrega: {
    type: DataTypes.DATE,
    allowNull: true,
    },
}, { tableName: 'envios',
  timestamps: true,
});
export default Envio;