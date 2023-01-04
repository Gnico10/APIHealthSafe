import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import ICitamedica from "../interfaces/iCitamedica";

import turno from "./turno";

const citamedica = sequelize.define<ICitamedica>('Citamedica', 
    {
        idcitamedica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechayhora: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: 'citasmedicas'
    }
);

citamedica.belongsTo(turno,{
    foreignKey: 'idturno',
    as: 'turno',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default citamedica;