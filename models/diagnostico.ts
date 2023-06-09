import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IDiagnostico from "../interfaces/;

import indicacionGeneral from './indicacionGeneral';
import medicamento from './medicamento';
import citamedicaemergencia from './citamedicaemergencia';


const diagnostico = sequelize.define<IDiagnostico>('diagnostico',
    {
        idDiagnostico: {
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
      
    },
    {
        tableName: 'diagnosticos'
    }
);

diagnostico.belongsTo(medicamento, {
    foreignKey: 'idMedicamento',
    as: 'medicamento',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});


diagnostico.belongsTo(indicacionGeneral, {
    foreignKey: 'idIndicacionGeneral',
    as: 'indicacionGeneral',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default  diagnostico;
