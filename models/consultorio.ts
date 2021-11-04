import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import IConsultorio from '../interfaces/iConsultorio';
import direccion from './direccion';

const consultorio = sequelize.define<IConsultorio>('Consultorio',
    {
        idconsultorio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        descripcion:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        iddireccion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: direccion,
                key: 'iddireccion',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'consultorios'
    }
);

consultorio.belongsTo(direccion,{
    foreignKey: 'iddireccion',
    as: 'direccion',
});

export default consultorio;