import sequelize from '../db/connection';
import ILocalidad from '../interfaces/iLocalidad';
import { DataTypes } from 'sequelize';

const localidad = sequelize.define<ILocalidad>('Localidad',
    {
        codpostal: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: 'Localidades'
    }
);

export default localidad;

