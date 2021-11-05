import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import IPaciente from '../interfaces/iPaciente';
import usuario from "./usuario";
import obrasocial from './obrasocial';

const paciente = sequelize.define<IPaciente>('Paciente',
    {
        idpaciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            allowNull: false,
            references: {
                model: usuario,
                key: 'dni',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idobrasocial:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: obrasocial,
                key: 'idobrasocial',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }
    },
    {
        tableName: 'pacientes'
    }
);

paciente.belongsTo(usuario,{
    foreignKey: 'dni',
    as: 'usuario',
});

paciente.belongsTo(obrasocial,{
    foreignKey: 'idobrasocial',
    as: 'obrasocial',
});




export default paciente;