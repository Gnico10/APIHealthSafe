
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IAntecedente from "../interfaces/iAntecedente";
import paciente from "./paciente";
import tipoantecedente from "./tipoantecedente";

const antecedente = sequelize.define<IAntecedente>('Antecedente',
    {
        idantecedente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idtipoantecedente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idPaciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName: 'antecedentes'
    }
);

antecedente.belongsTo(tipoantecedente, {
    foreignKey: 'idtipoantecedente',
    as:'tipoantecedente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

antecedente.belongsTo(paciente, {
    foreignKey: 'idPaciente',
    as:'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default antecedente;