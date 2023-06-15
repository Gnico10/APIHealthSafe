import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IUsuario from '../interfaces/iUsuario';

import rol from './rol'

const usuario = sequelize.define<IUsuario>('Usuario',
    { 
        idusuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        fechanacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sexo: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['M', 'F']
        },
        imgperfil:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imgdnifrente:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imgdnidorso:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        idrol: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: 'usuarios'
    }
);

usuario.belongsTo(rol, {
    foreignKey: 'idrol',
    as: 'rol',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default usuario;