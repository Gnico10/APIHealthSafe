import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import ITipoindicaciongeneral from '../interfaces/iTipoindicaciongeneral';

const tipoindicaciongeneral = sequelize.define<ITipoindicaciongeneral>('tipoindicaciongeneral',
    { 
        idtipoindicaciongeneral: {
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
        tableName: 'tipoindicaciongeneral'
    }
);

export default tipoindicaciongeneral;