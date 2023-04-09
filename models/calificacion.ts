import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import ICalificacion from '../interfaces/iCalificacion';

import paciente from "./paciente";
import profesional from './profesional';

const calificacion = sequelize.define<ICalificacion>('calificacion',
    {
        idcalificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numcalificacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comentario: DataTypes.TEXT,
        idPaciente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'calificaciones'
    }
);

calificacion.belongsTo(paciente, {
    foreignKey: 'idPaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

calificacion.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default calificacion;