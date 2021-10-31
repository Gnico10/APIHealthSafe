import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario', {
    dni: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgperfil: DataTypes.BLOB
},
{
    tableName: 'usuarios'
}
);

export default Usuario;