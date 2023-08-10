import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesionalespecialidad from "../interfaces/iProfesionapespecialidad";

import colegiomedico from "./colegiomedico";
import profesional from "./profesional";
import especialidad from "./especialidad";

const profesionalespecialidad = sequelize.define<IProfesionalespecialidad>('Profesionales_Especialidades',
    {
        idprofesionalespecialidad: {
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
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idespecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idcolegiomedico: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'profesionalesespecialidades'
    }
    );
    
profesionalespecialidad.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
})

profesionalespecialidad.belongsTo(especialidad, {
    foreignKey: 'idespecialidad',
    as: 'especialidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
})

profesionalespecialidad.belongsTo(colegiomedico, {
    foreignKey: 'idcolegiomedico',
    as: 'colegiomedico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
})

export default profesionalespecialidad;