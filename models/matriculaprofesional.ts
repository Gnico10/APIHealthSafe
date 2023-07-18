import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IMatriculaprofesional from '../interfaces/iMatriculaprofesional';

import TipoMatricula from './tipomatricula';
import Universidad from './universidad';
import TituloGrado from './titulogrado';

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
        aniootorgamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                len: [4, 4] // number of 4 digits
            }
        },
        idtipomatricula: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iduniversidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idtitulogrado: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'matriculasprofesionales'
    }
);

matriculaprofesional.belongsTo(TipoMatricula, {
    foreignKey: 'idtipomatricula',
    as: 'tipomatricula',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

matriculaprofesional.belongsTo(Universidad, {
    foreignKey: 'iduniversidad',
    as: 'universidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

matriculaprofesional.belongsTo(TituloGrado, {
    foreignKey: 'idtitulogrado',
    as: 'titulogrado',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

export default matriculaprofesional;