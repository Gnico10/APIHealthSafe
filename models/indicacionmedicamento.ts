import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iIndicacionmedicamento from "../interfaces/iIndicacionmedicamento";
import Diagnostico from "./diagnostico";
import Medicamento from "./medicamento";

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
        cantidad: {
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
        
        iddiagnostico: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idmedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'indicacionesmedicamentos'
    }
);

indicacionmedicamento.belongsTo(Diagnostico, {
    foreignKey: 'iddiagnostico',
    as: 'diagnostico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

indicacionmedicamento.belongsTo(Medicamento, {
    foreignKey: 'idmedicamento',
    as: 'medicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});



export default  indicacionmedicamento;
