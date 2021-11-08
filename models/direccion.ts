import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IDireccion from '../interfaces/iDireccion';

import localidad from './localidad';

const direccion = sequelize.define<IDireccion>('Direccion',
    {
        iddireccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        calle:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        piso: DataTypes.STRING(100),
        manzana: DataTypes.STRING(100),
        lote: DataTypes.STRING(100),
        codpostal: {
            type: DataTypes.STRING(10),
            allowNull: false,
            references: {
                model: localidad,
                key: 'codpostal',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'direcciones'
    }
);

direccion.belongsTo(localidad, {
    foreignKey: 'codpostal',
    as: 'localidad',
});

export default direccion;

