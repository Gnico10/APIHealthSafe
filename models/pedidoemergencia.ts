import sequelize from "../db/connection";
import IPedidoEmergencia from '../interfaces/iPedidosEmergencia';
import { DataTypes } from 'sequelize';
import especialidad from './especialidad';
import paciente from './paciente';

const pedidoemergencia = sequelize.define<IPedidoEmergencia>('Pedidoemergencia',
    {
        idpedidoemergencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        idespecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: especialidad,
                key: 'idespecialidad',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: paciente,
                key: 'idpaciente',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }
    },
    {
        tableName: 'pedidosemergencia'
    }
);

pedidoemergencia.belongsTo(especialidad,{
    foreignKey: 'idespecialidad',
    as: 'especialidad'
});

pedidoemergencia.belongsTo(paciente,{
    foreignKey: 'idpaciente',
    as: 'paciente'
});

export default pedidoemergencia;