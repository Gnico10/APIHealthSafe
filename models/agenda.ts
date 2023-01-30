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
            allowNull: true,
        },
        fechahasta: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        horainicio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        horafin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        duracion: { // minutos
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    },
    {
        tableName: 'agendas'
    }
);

agenda.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as:'profesionales',
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