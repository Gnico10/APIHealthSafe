import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IAgenda from '../interfaces/iAgenda';

import profesional from './profesional';

const agenda = sequelize.define<IAgenda>('Agenda',
    {
        idagenda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        configuracionHorario: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        fechaDesde: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fechaHasta: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        duracionTurno: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    },
    {
        tableName: 'agendas'
    }
);

agenda.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as:'especialidades'
});

export default agenda;