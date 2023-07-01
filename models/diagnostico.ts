import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IDiagnostico from '../interfaces/iDiagnostico';
import RegistroHistoriaClinica from './registrohistoriaclinica';

const diagnostico = sequelize.define<IDiagnostico>('diagnostico',
    {
        iddiagnostico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idregistrohistoriaclinica: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'diagnosticos'
    }
);

diagnostico.belongsTo(RegistroHistoriaClinica, {
    foreignKey: 'idregistrohistoriaclinica',
    as: 'registrohistoriaclinica',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });  

export default  diagnostico;
