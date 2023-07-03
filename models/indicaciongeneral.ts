import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iIndicaciongeneral from "../interfaces/iIndicaciongeneral";
import Diagnostico from "./diagnostico";

const indicaciongeneral = sequelize.define<iIndicaciongeneral>('indicaciongeneral',
    {
        idindicaciongeneral: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        iddiagnostico: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'indicacionesgenerales'
    }
);

indicaciongeneral.belongsTo(Diagnostico, {
    foreignKey: 'iddiagnostico',
    as: 'diagnostico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

export default  indicaciongeneral;
