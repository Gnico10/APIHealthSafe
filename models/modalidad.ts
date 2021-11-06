import sequelize from '../db/connection';
import IModalidad from '../interfaces/iModalidad';
import { DataTypes } from 'sequelize';

const modalidad = sequelize.define<IModalidad>('Modalidad',
    {
        idmodalidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        tableName: 'modalidades'
    }
);

export default modalidad;