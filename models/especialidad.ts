
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import IEspecialidad from '../interfaces/iEspecialidad';


const especialidad = sequelize.define<IEspecialidad>('Especialidad',
    {
        idespecialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'especialidades'
    }
);

export default especialidad;