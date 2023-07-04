import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iRegistrohistoriaclinica from "../interfaces/iRegistrohistoriaclinica";
import paciente from './paciente';
import turno from './turno';

const registrohistoriaclinica = sequelize.define<iRegistrohistoriaclinica>('registrohistoriaclinica',
    {
        idregistrohistoriaclinica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fechahora: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        idturno: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'registroshistoriaclinica'
    }
);

registrohistoriaclinica.belongsTo(paciente, {
    foreignKey: 'idpaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

registrohistoriaclinica.belongsTo(turno, {
    foreignKey: 'idpaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

export default registrohistoriaclinica;
