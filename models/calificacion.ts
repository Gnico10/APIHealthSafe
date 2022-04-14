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
            autoIncrement: true,
        },
        numcalificacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comentario: DataTypes.TEXT,
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: paciente,
                key: 'idpaciente',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: profesional,
                key: 'idprofesional',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }
    },
    {
        tableName: 'calificaciones'
    }
);

calificacion.belongsTo(paciente,{
    foreignKey: 'idpaciente',
    as: 'paciente',
});

calificacion.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as: 'profesional',
});

export default calificacion;