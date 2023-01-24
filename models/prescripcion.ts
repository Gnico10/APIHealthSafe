import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IPrescripcion from '../interfaces/iPrescripcion';

const prescripcion = sequelize.define<IPrescripcion>('Prescripcion',
    {
        idprescripcion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        tableName: 'prescripciones'
    }
);

export default prescripcion;