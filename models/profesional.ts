import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesional from '../interfaces/iProfesional';

import usuario from "./usuario";

const profesional = sequelize.define<IProfesional>('Profesional',
    {
        idprofesional: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: DataTypes.TEXT,
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'profesionales'
    }
);

profesional.belongsTo(usuario, {
    foreignKey: 'idusuario',
    as: 'usuario',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});


export default profesional;