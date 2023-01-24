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
        }
    },
    {
        tableName: 'horarios'
    }
);

horario.belongsTo(agenda, {
    foreignKey: 'idagenda',
    as:'agendas',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default horario;