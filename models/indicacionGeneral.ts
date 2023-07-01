import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import iIndicaciongeneral from "../interfaces/iIndicacionGeneral";
import diagnostico from "./diagnostico";

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
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'indicacionesgenerales'
    }
);

indicaciongeneral.belongsTo(diagnostico, {
    foreignKey: 'iddiagnostico',
    as: 'diagnostico',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

export default  indicaciongeneral;