import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import ITituloGrado from '../interfaces/iTituloGrado';

const titulogrado = sequelize.define<ITituloGrado>('TituloGrado',
    { 
        idtitulogrado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    },
    {
        tableName: 'titulosgrado'
    }
);

export default titulogrado;