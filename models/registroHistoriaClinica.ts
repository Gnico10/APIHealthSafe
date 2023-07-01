import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import iRegistrohistoriaclinica from "../interfaces/iRegistroHistoriaClinica";

const registrohistoriaclinica = sequelize.define<iRegistrohistoriaclinica>('registrohistoriaclinica',
    {
        idregistrohistoriaclinica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fechahora: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'registroshistoriaclinica'
    }
);

export default registrohistoriaclinica;