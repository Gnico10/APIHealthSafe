import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import IPaciente from '../interfaces/iPaciente';
import usuario from "./usuario";

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
            references: {
                model: usuario,
                key: 'dni',
            }
        }
    },
    {
        tableName: 'pacientes'
    }
);

paciente.belongsTo(usuario,{
    foreignKey: 'dni',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


export default paciente;