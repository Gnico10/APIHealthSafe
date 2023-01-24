import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IMatriculaProfesional from '../interfaces/IMatriculaProfesional';

import tipomatricula from './tipomatricula';
import universidad from './universidad';

const matriculaprofesional = sequelize.define<IMatriculaProfesional>('MatriculaProfesional',
    { 
        idmatriculaprofesional: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
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