
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IAntecedente from "../interfaces/iAntecedente";
import Paciente from "./paciente";
import TipoAntecedente from "./tipoantecedente";
import Profesional from "./profesional";

const antecedente = sequelize.define<IAntecedente>('Antecedente',
    {
        idantecedente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        idtipoantecedente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idpaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'antecedentes'
    }
);

antecedente.belongsTo(TipoAntecedente, {
    foreignKey: 'idtipoantecedente',
    as:'tipoantecedente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

antecedente.belongsTo(Paciente, {
    foreignKey: 'idpaciente',
    as:'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

antecedente.belongsTo(Profesional, {
    foreignKey: 'idprofesional',
    as:'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default antecedente;