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
        }
    },
    {
        tableName: 'mensajerias'
    }
);

mensajeria.belongsTo(paciente, {
    foreignKey: 'idpaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

mensajeria.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default mensajeria;