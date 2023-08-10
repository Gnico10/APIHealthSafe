import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';


import IProfesionalmatricula from '../interfaces/iProfesionalmatricula';

import TipoMatricula from './tipomatricula';
import Universidad from './universidad';
import TituloGrado from './titulogrado';
import Profesional from './profesional';

const profesionalmatricula = sequelize.define<IProfesionalmatricula>('MatriculaProfesional',
    { 
        idprofesionalmatricula: {
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
        idprofesional: {
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
        },
        idtitulogrado: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'profesionalesmatriculas'
    }
);

profesionalmatricula.belongsTo(Profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

profesionalmatricula.belongsTo(TipoMatricula, {
    foreignKey: 'idtipomatricula',
    as: 'tipomatricula',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

profesionalmatricula.belongsTo(Universidad, {
    foreignKey: 'iduniversidad',
    as: 'universidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

profesionalmatricula.belongsTo(TituloGrado, {
    foreignKey: 'idtitulogrado',
    as: 'titulogrado',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

export default profesionalmatricula;