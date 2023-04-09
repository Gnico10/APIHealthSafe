import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iMedicamento from '../interfaces/iMedicamento';

import indicacionMedicamento from '../models/indicacionMedicamento';

const medicamento = sequelize.define<iMedicamento>('Medicamento',
    {
        idMedicamento: {
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
        idDiagnostico: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        
    },
    {
        tableName: 'medicamentos'
    }
);

medicamento.belongsTo(typeof indicacionMedicamento, {
    foreignKey: 'idIndicacionMedicamento',
    as: 'IndicacionMedicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

medicamento.prototype.setIndicacion = async function(indicacion: IndicacionMedicamento): Promise<void> {
    await this.setIndicacionMedicamento(indicacion);
};

export default  medicamento;