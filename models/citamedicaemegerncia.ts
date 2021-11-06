import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import ICitamedicaemergencia from "../interfaces/iCitamedicaemergencia";
import paciente from "./paciente";
import profesional from './profesional';

const citamedicaemergencia = sequelize.define<ICitamedicaemergencia>('Citamedicaemergencia',
    {
        idcitamedicaemergencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        idpaciente:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: paciente,
                key: 'idpaciente',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idprofesional:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: profesional,
                key: 'idprofesional',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }
    },
    {
        tableName: 'citamedicaemergencia'
    }
);

citamedicaemergencia.belongsTo(paciente,{
    foreignKey: 'idpaciente',
    as: 'paciente',
});

citamedicaemergencia.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as: 'profesional',
});