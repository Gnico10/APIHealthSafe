import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesional from '../interfaces/iProfesional';
import especialidad from "./especialidad";
import profesionales_especialidades from "./profesionales_especialidades";

import usuario from "./usuario";

const profesional = sequelize.define<IProfesional>('Profesional',
    {
        idprofesional: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        matriculanacional : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        matriculaprovincial : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        fechanacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dni:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: usuario,
                key: 'dni',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }
    },
    {
        tableName: 'profesionales'
    }
);

profesional.belongsTo(usuario,{
    foreignKey: 'dni',
    as: 'usuario',
});

export default profesional;