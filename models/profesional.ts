import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import usuario from "./usuario";
import IProfesional from '../interfaces/iProfesional';

const profesional = sequelize.define<IProfesional>('Profesional',
    {
        idprofesional: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        matriculanacional : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        matriculaprovincial : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        fechanacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dni:{
            type: DataTypes.INTEGER,
            references: {
                model: usuario,
                key: 'dni',
            }
        }
    },
    {
        tableName: 'profesionales'
    }
);

profesional.belongsTo(usuario,{
    foreignKey: 'dni',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


export default profesional;