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
    },
    {
        tableName: 'medicamentos'
    }
);

medicamento.belongsTo(indicacionMedicamento, {
    foreignKey: 'idindicacionMedicamento',
    as: 'indicacionMedicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});


export default  medicamento;