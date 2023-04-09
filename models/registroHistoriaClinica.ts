import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iRegistroHistoriaClinica from "../interfaces/iRegistroHistoriaClinica";


import diagnostico from './diagnostico';
import paciente from './paciente';



const registroHistoriaClinica = sequelize.define<iRegistroHistoriaClinica>('registroHistoriaClinica',
    {
        idRegistroHistoriaClinica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false
        },
      
    },
    {
        tableName: 'registrosHistoriaClinica'
    }
);

registroHistoriaClinica.belongsTo(diagnostico, {
    foreignKey: 'idDiagnostico',
    as: 'diagnostico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

registroHistoriaClinica.belongsTo(paciente, {
    foreignKey: 'idPaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});


export default registroHistoriaClinica;