import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IDireccion from '../interfaces/iDireccion';

import localidad from './localidad';

const direccion = sequelize.define<IDireccion>('Direccion',
    {
        iddireccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        calle: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        numero: DataTypes.STRING(5),
        piso: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        codpostal: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },
    {
        tableName: 'direcciones'
    }
);

direccion.belongsTo(localidad, {
    foreignKey: 'codpostal',
    as: 'localidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default direccion;

