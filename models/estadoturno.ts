import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IEstadoturno from '../interfaces/iEstadoturno';

const estadoturno = sequelize.define<IEstadoturno>('Estadoturno',
    {
        idestadoturno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: 'estadosturno'
    }
);

export default  estadoturno;