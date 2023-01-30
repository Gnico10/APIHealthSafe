import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IPais from '../interfaces/iPais';

const pais = sequelize.define<IPais>('Pais',
    { 
        idpais: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName: 'paises'
    }
);

export default pais;