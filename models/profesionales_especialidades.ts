import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesionales_Especialidades from '../interfaces/iProfesionales_Especialidades';

import colegiomedico from "./colegiomedico";
import profesional from "./profesional";
import especialidad from "./especialidad";

const profesionales_especialidades = sequelize.define<IProfesionales_Especialidades>('Profesionales_Especialidades',
    {
        idprofesionalesespecialidades: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        aniootorgamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                len: [4, 4] // number of 4 digits
            }
        },
        idcolegiomedico: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idespecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'profesionales_especialidades'
    }
);

profesionales_especialidades.belongsTo(colegiomedico, {
    foreignKey: 'idcolegiomedico',
    as: 'colegiomedico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
})

profesional.belongsToMany(especialidad, {
    through: profesionales_especialidades,
    as: 'PE_especialidades',
    foreignKey: 'idprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

especialidad.belongsToMany(profesional, {
    through: profesionales_especialidades,
    as: 'PE_profesionales',
    foreignKey: 'idespecialidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default profesionales_especialidades;