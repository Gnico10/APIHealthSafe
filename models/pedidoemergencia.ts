import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IPedidoEmergencia from '../interfaces/iPedidosEmergencia';

import especialidad from './especialidad';
import paciente from './paciente';

const pedidoemergencia = sequelize.define<IPedidoEmergencia>('Pedidoemergencia',
    {
        idpedidoemergencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sintomas: DataTypes.TEXT,
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        estado: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        idespecialidad:  {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPaciente:  {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'pedidosemergencia'
    }
);

pedidoemergencia.belongsTo(especialidad, {
    foreignKey: 'idespecialidad',
    as: 'especialidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

pedidoemergencia.belongsTo(paciente, {
    foreignKey: 'idPaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default pedidoemergencia;