import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IObrasocial from '../interfaces/iObrasocial';


const obrasocial = sequelize.define<IObrasocial>('Obrasocial',
    {
        idobrasocial: {
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
        tableName: 'obrassociales'
    }
);

export default obrasocial;