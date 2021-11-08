import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IModalidad from '../interfaces/iModalidad';

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