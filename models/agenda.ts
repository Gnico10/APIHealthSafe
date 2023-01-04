import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IAgenda from '../interfaces/iAgenda';

import profesional from './profesional';

const agenda = sequelize.define<IAgenda>('Agenda',
    {
        idagenda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        configuracionhorario: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        fechadesde: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        fechahasta: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        duracionturno: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'agendas'
    }
);

agenda.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as:'especialidades',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default agenda;