import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import profesional from "./profesional";
import especialidad from "./especialidad";
import IProfesionales_Especialidades from '../interfaces/iProfesionales_Especialidades';

// tslint:disable-next-line: variable-name
const profesionales_especialidades = sequelize.define<IProfesionales_Especialidades>('ProfesionalEspecialidad',
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
            }
        },
        idespecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: especialidad,
                key: 'idespecialidad',
            }
        },
    },
    {
        tableName: 'profesionales_especialidades'
    }
);

profesional.belongsToMany(especialidad,{
    through: 'profesionales_especialidades',
    foreignKey: 'idprofesional',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
especialidad.belongsToMany(profesional,{
    through: 'profesionales_especialidades',
    foreignKey: 'idespecialidad',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


export default profesionales_especialidades;