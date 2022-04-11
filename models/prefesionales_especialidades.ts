import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesionales_Especialidades from '../interfaces/iProfesionales_Especialidades';

import profesional from "./profesional";
import especialidad from "./especialidad";

// tslint:disable-next-line: variable-name
const profesionales_especialidades = sequelize.define<IProfesionales_Especialidades>('Profesionales_Especialidades',
    {
        idprofesionalesespecialidades: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: profesional,
                key: 'idprofesional'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
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
    },
    {
        tableName: 'profesionales_especialidades'
    }
);

profesional.belongsToMany(especialidad,{
    through: 'profesionales_especialidades',
    foreignKey: 'idespecialidad',
    otherKey: 'idespecialidad',
    as:'especialidades'
});

especialidad.belongsToMany(profesional,{
    through: 'profesionales_especialidades',
    foreignKey: 'idprofesional',
    otherKey: 'idprofesional',
    as: 'profesionales'
});


export default profesionales_especialidades;