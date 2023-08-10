import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IAgenda from '../interfaces/iAgenda';

import consultorio from './consultorio';
import modalidad from './modalidad';
import profesional from './profesional';

const agenda = sequelize.define<IAgenda>('Agenda',
    {
        idagenda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechadesde: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        fechahasta: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        horainicio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horafin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: { // minutos
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idmodalidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idconsultorio: {
            type: DataTypes.INTEGER,
            allowNull: true // En modalidad virtual, no tiene consultorio.
        }
    },
    {
        tableName: 'agendas'
    }
);

agenda.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as:'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

agenda.belongsTo(modalidad, {
    foreignKey: 'idmodalidad',
    as: 'modalidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

agenda.belongsTo(consultorio, {
    foreignKey: 'idconsultorio',
    as: 'consultorio',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default agenda;