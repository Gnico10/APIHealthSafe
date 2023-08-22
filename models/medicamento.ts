import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iMedicamento from '../interfaces/iMedicamento';

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
    },
    {
        tableName: 'medicamentos'
    }
);

export default  medicamento;
