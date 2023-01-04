import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesionales_Obrassociales from '../interfaces/iProfesionales_Obrassociales';

import obrasocial from './obrasocial';
import profesional from './profesional';

const profesionales_obrassociales = sequelize.define<IProfesionales_Obrassociales>('Profesionales_Obrassociales',
    {
        idprofesionalesobrassociales: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: 'profesionales_obrassociales'
    }
);

profesional.belongsToMany(obrasocial, {
    through: profesionales_obrassociales,
    as:'obrassociales',
    foreignKey: 'idobrasocial',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

obrasocial.belongsToMany(profesional, {
    through: profesionales_obrassociales,
    as: 'profesionales',
    foreignKey: 'idprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default profesionales_obrassociales;