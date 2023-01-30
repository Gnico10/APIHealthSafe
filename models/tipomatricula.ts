import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import ITipoMatricula from '../interfaces/iTipoMatricula';

const tipomatricula = sequelize.define<ITipoMatricula>('TipoMatricula',
    { 
        idtipomatricula: {
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
        tableName: 'tiposmatricula'
    }
);

export default tipomatricula;