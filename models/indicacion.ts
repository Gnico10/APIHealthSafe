import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import IIndicacion from '../interfaces/iIndicacion';

const indicacion = sequelize.define<IIndicacion>('Indicacion',
    {
        idindicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }
);

export default  indicacion;