import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iRegistroHistoriaClinica from "../interfaces/iRegistroHistoriaClinica";


import diagnostico from './diagnostico';



const registroHistoriaClinica = sequelize.define<iRegistroHistoriaClinica>('registroHistoriaClinica',
    {
        idregistroHistoriaClinica: {
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
    foreignKey: 'idiagnostico',
    as: 'diagnostico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});


export default registroHistoriaClinica;