import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iIndicacionMedicamento from "../interfaces/iIndicacionMedicamento";

const indicacionMedicamento = sequelize.define<iIndicacionMedicamento>('indicacionMedicamento',
    {
        idIndicacionMedicamento: {
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

        duracionTratamiento: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        observaciones: {
            type: DataTypes.TEXT,
            allowNull: false
        },
      
    },
    {
        tableName: 'indicacionMedicamentos'
    }
);

export default  indicacionMedicamento;