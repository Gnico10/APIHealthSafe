import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IPaciente from '../interfaces/iPaciente';

import usuario from "./usuario";

const paciente = sequelize.define<IPaciente>('paciente',
    {
        idpaciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ocupacion: {type: DataTypes.STRING(50)}
    },
    {
        tableName: 'pacientes'
    }
);

paciente.belongsTo(usuario, {
    foreignKey: 'idusuario',
    as: 'usuario',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default paciente;