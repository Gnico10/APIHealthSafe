import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iRegistrohistoriaclinica from "../interfaces/iRegistrohistoriaclinica";
import paciente from './paciente';
import turno from './turno';
import profesional from './profesional';

const registrohistoriaclinica = sequelize.define<iRegistrohistoriaclinica>('registrohistoriaclinica',
    {
        idregistrohistoriaclinica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idturno: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false,
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

registrohistoriaclinica.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

registrohistoriaclinica.belongsTo(turno, {
    foreignKey: 'idturno',
    as: 'turno',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

export default registrohistoriaclinica;
