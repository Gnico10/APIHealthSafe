import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IMensajeria from "../interfaces/iMensajeria";

import paciente from "./paciente";
import profesional from "./profesional";

const mensajeria = sequelize.define<IMensajeria>('Mensajeria',
    {
        idmensajeria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: paciente,
                key: 'idpaciente',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: profesional,
                key: 'idprofesional',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'mensajerias'
    }
);

mensajeria.belongsTo(paciente,{
    foreignKey: 'idpaciente',
    as: 'paciente'
});

mensajeria.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as: 'profesional'
});

export default mensajeria;