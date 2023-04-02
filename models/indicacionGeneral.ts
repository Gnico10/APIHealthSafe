import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iIndicacionGeneral from '../interfaces/iIndicacionGeneral';

const indicacionGeneral = sequelize.define<iIndicacionGeneral>('indicacionGeneral',
    {
        idindicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: 'indicacionesGenerales'
    }
);

export default  indicacionGeneral;