import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import IUsuario from '../interfaces/iUsuario';


const usuario = sequelize.define<IUsuario>('Usuario',
    {
        dni: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imgperfil:{
        type: DataTypes.BLOB,
        allowNull: true,}
    },
    {
        tableName: 'usuarios'
    }
);

// usuario.hasOne(paciente, {
//     foreignKey: 'dni',
//     onDelete: 'RESTRICT',
//     onUpdate: 'CASCADE',
// });

export default usuario;