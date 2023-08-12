import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IConsultorio from '../interfaces/iConsultorio';

import direccion from './direccion';
import profesional from './profesional';

const consultorio = sequelize.define<IConsultorio>('Consultorio',
    {
        idconsultorio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        numeroConsultorio: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        iddireccion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'consultorios'
    }
);

consultorio.belongsTo(direccion, {
    foreignKey: 'iddireccion',
    as: 'direccion',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

consultorio.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default consultorio;