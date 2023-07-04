import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iMedicamento from '../interfaces/iMedicamento';
import indicacionmedicamento from "./indicacionmedicamento";
import diagnostico from "./diagnostico";

const medicamento = sequelize.define<iMedicamento>('medicamento',
    {
        idmedicamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        monodroga: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        presentacion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        iddiagnostico: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idindicacionmedicamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'medicamentos'
    }
);

medicamento.belongsTo(diagnostico, {
    foreignKey: 'iddiagnostico',
    as: 'diagnostico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

medicamento.belongsTo(indicacionmedicamento, {
    foreignKey: 'idindicacionmedicamento',
    as: 'indicacionmedicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});


export default  medicamento;
