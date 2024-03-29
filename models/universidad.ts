import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IUniversidad from '../interfaces/iUniversidad';

import pais from './pais';

const universidad = sequelize.define<IUniversidad>('Universidad',
    { 
        iduniversidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        idpais: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'universidades'
    }
);

universidad.belongsTo(pais, {
    foreignKey: 'idpais',
    as: 'pais',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
})

export default universidad;