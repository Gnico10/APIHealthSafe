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
        idmensajeria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: mensajeria,
                key: 'idmensajeria',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'mensajes'
    }
);

mensaje.belongsTo(mensajeria,{
    foreignKey: 'idmensajeria',
    as: 'mensajeria'
});

export default mensaje;