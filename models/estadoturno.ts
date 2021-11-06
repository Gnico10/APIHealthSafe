import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import IIndicacion from '../interfaces/iIndicacion';
import IEstadoturno from '../interfaces/iEstadoturno';

const estadoturno = sequelize.define<IEstadoturno>('Estadoturno',
    {
        idestadoturno: {
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

export default  estadoturno;