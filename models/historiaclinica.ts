import { DataTypes } from "sequelize/types";
import sequelize from "../db/connection";
import IHistoriaClinica from '../interfaces/iHistoriaclinica';
import paciente from './paciente';

const historiaclinica = sequelize.define<IHistoriaClinica>('Historiaclinica',
    {
        idhistoriaclinica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: paciente,
                key: 'idpaciente',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }
    },
    {
        tableName: 'historiasclinicas'
    }
);

historiaclinica.belongsTo(paciente,{
    foreignKey: 'idpaciente',
    as: 'paciente'
});

export default historiaclinica;