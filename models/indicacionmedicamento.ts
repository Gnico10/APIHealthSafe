import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iIndicacionmedicamento from "../interfaces/iIndicacionmedicamento";

const indicacionmedicamento = sequelize.define<iIndicacionmedicamento>('indicacionmedicamento',
    {
        idindicacionmedicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dosis: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        periodicidad: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        duraciontratamiento: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: 'indicacionesmedicamentos'
    }
);

export default  indicacionmedicamento;
