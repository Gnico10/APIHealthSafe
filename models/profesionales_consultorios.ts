import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import profesional from "./profesional";
import especialidad from "./especialidad";
import IProfesionales_Especialidades from '../interfaces/iProfesionales_Especialidades';
import IProfesionales_Consultorios from '../interfaces/iProfesionales_Consultorios';
import consultorio from './consultorio';

// tslint:disable-next-line: variable-name
const profesionales_consultorios = sequelize.define<IProfesionales_Consultorios>('ProfesionalConsultorio',
    {
        idprofesionalesconsultorios: {
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
        idconsultorio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: consultorio,
                key: 'idconsultorio',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'profesionales_consultorios'
    }
);

profesional.belongsToMany(consultorio,{
    through: 'profesionales_consultorios',
    foreignKey: 'idprofesional',
    otherKey: 'idconsultorio',
    as:'consultorios'
});

consultorio.belongsToMany(profesional,{
    through: 'profesionales_especialidades',
    foreignKey: 'idespecialidad',
    otherKey: 'idprofesional',
    as: 'profesionales'
});


export default profesionales_consultorios;