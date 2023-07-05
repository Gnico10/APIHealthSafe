import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import ICitamedicaemergencia from "../interfaces/iCitamedicaemergencia";

import paciente from "./paciente";
import profesional from './profesional';

const citamedicaemergencia = sequelize.define<ICitamedicaemergencia>('Citamedicaemergencia',
    {
        idcitamedicaemergencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'citamedicaemergencias'
    }
);

citamedicaemergencia.belongsTo(paciente, {
    foreignKey: 'idpaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

citamedicaemergencia.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default citamedicaemergencia;