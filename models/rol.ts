import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import IRol from '../interfaces/iRol';


const rol = sequelize.define<IRol>('Rol',
    { 
        idrol: {
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
        tableName: 'roles'
    }
);

export default rol;