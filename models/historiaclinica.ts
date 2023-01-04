import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IHistoriaClinica from '../interfaces/iHistoriaclinica';

const historiaclinica = sequelize.define<IHistoriaClinica>('Historiaclinica',
    {
        idhistoriaclinica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        peso:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'historiasclinicas'
    }
);

export default historiaclinica;