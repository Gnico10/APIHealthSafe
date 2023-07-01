import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iIndicacionmedicamento from "../interfaces/iIndicacionMedicamento";

const indicacionmedicamento = sequelize.define<iIndicacionmedicamento>('indicacionmedicamento',
    {
        idindicacionmedicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dosis: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        periodicidad: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        duraciontratamiento: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        observaciones: {
            type: DataTypes.TEXT
        },
    },
    {
        tableName: 'indicacionesmedicamentos'
    }
);

export default  indicacionmedicamento;