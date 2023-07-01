import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iMedicamento from '../interfaces/iMedicamento';

import diagnostico from "./diagnostico";
import medicamento from "./medicamento";
import iIndicacionmedicamento from "../interfaces/iIndicacionMedicamento";

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
        },
        idmedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'indicacionesmedicamentos'
    }
);

indicacionmedicamento.belongsTo(medicamento, {
    foreignKey: 'idmedicamento',
    as: 'medicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
})

export default  indicacionmedicamento;
