import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesionales_Consultorios from '../interfaces/iProfesionales_Consultorios';

import profesional from "./profesional";
import consultorio from './consultorio';

const profesionales_consultorios = sequelize.define<IProfesionales_Consultorios>('Profesionales_Consultorios',
    {
        idprofesionalesconsultorios: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: 'profesionales_consultorios'
    }
);

profesional.belongsToMany(consultorio, {
    through: profesionales_consultorios,
    as: 'PC_consultorios',
    foreignKey: 'idprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

consultorio.belongsToMany(profesional, {
    through: profesionales_consultorios,
    as:'PC_profesionales',
    foreignKey: 'idconsultorio',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default profesionales_consultorios;