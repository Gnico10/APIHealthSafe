import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IPaciente from '../interfaces/iPaciente';

import usuario from "./usuario";
import obrasocial from './obrasocial';
import historiaclinica from "./historiaclinica";

const paciente = sequelize.define<IPaciente>('Paciente',
    {
        idpaciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: 'pacientes'
    }
);

paciente.belongsTo(usuario,{
    foreignKey: 'idusuario',
    as: 'usuario',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

paciente.belongsTo(historiaclinica,{
    foreignKey: 'idhistoriaclinica',
    as: 'historiaclinica',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

paciente.belongsTo(obrasocial,{
    foreignKey: 'idobrasocial',
    as: 'obrasocial',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default paciente;