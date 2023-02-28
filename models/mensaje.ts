import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IMensaje from '../interfaces/iMensaje';

import mensajeria from "./mensajeria";

const mensaje = sequelize.define<IMensaje>('Mensaje',
    {
        idmensaje: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
       
      
    },
    {
        tableName: 'mensajes'
    }
);

mensaje.belongsTo(mensajeria, {
    foreignKey: 'idmensajeria',
    as: 'mensajeria',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default mensaje;