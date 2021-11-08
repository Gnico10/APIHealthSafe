import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IDias from '../interfaces/iDia';

const dia = sequelize.define<IDias>('dias',
    {
        iddia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },
    {
        tableName: 'dias'
    }
);

export default dia;