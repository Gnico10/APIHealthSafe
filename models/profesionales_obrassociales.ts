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
        idobrasocial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: obrasocial,
                key: 'idobrasocial',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'profesionales_obrassociales'
    }
);

profesional.belongsToMany(obrasocial,{
    through: 'profesionales_obrassociales',
    foreignKey: 'idprofesional',
    otherKey: 'idobrasocial',
    as:'obrassociales'
});

obrasocial.belongsToMany(profesional,{
    through: 'profesionales_obrassociales',
    foreignKey: 'idobrasocial',
    otherKey: 'idprofesional',
    as: 'profesionales'
});

export default profesionales_obrassociales;