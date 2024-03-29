import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import ILocalidad from '../interfaces/iLocalidad';

const localidad = sequelize.define<ILocalidad>('Localidad',
    {
        codpostal: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },
    {
        tableName: 'localidades'
    }
);

export default localidad;

