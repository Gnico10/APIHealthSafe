import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IHorario from '../interfaces/iHorario';

import agenda from './agenda';

const horario = sequelize.define<IHorario>('horarios',
    {
        idhorario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        horainicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horafin: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        idagenda: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: agenda,
                key: 'idagenda'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'horarios'
    }
);

horario.belongsTo(agenda, {
    foreignKey: 'idagenda',
    as:'agendas'
});

export default horario;