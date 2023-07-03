
import sequelize from "../db/connection";
import { DataTypes } from 'sequelize';

import ITurno from "../interfaces/iTurno";

import agenda from "./agenda";
import paciente from "./paciente";
import especialidad from "./especialidad";

const turno = sequelize.define<ITurno>('turno', {
        idturno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        horainicio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        horafin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechasolicita: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        idespecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idpagomercadopago: { // Mercado Pago.
            type: DataTypes.STRING,
            allowNull: false
        },
        idPaciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idagenda: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'turnos'
    }
);

turno.belongsTo(agenda, {
    foreignKey: 'idagenda',
    as: 'agenda',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

turno.belongsTo(paciente, {
    foreignKey: 'idPaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

turno.belongsTo(especialidad, {
    foreignKey: 'idespecialidad',
    as: 'especialidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
})

export default turno;