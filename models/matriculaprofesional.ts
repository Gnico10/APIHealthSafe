import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IMatriculaprofesional from '../interfaces/iMatriculaprofesional';

import tipomatricula from './tipomatricula';
import universidad from './universidad';

const matriculaprofesional = sequelize.define<IMatriculaprofesional>('MatriculaProfesional',
    { 
        idmatriculaprofesional: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idtipomatricula: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iduniversidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'matriculasprofesionales'
    }
);

matriculaprofesional.belongsTo(tipomatricula, {
    foreignKey: 'idtipomatricula',
    as: 'tipomatricula',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

matriculaprofesional.belongsTo(universidad, {
    foreignKey: 'iduniversidad',
    as: 'universidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default matriculaprofesional;