import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IColegioMedico from '../interfaces/iColegioMedico';

import pais from './pais';

const colegiomedico = sequelize.define<IColegioMedico>('ColegioMedico',
    { 
        idcolegiomedico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName: 'colegiosmedicos'
    }
);

colegiomedico.belongsTo(pais, {
    foreignKey: 'idpais',
    as: 'pais',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
})

export default colegiomedico;