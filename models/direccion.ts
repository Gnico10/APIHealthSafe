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
        calle:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        piso: DataTypes.STRING(100),
        manzana: DataTypes.STRING(100),
        lote: DataTypes.STRING(100)
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

