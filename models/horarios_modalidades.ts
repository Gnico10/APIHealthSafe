import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IHorarios_Modalidades from '../interfaces/iHorarios_Modalidades';

import modalidad from './modalidad';
import horario from './horario';

const horarios_modalidades = sequelize.define<IHorarios_Modalidades>('Horarios_Modalidades',
    {
        idhorariosmodalidades: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: 'horarios_modalidades'
    }
);

horario.belongsToMany(modalidad, {
    through: horarios_modalidades,
    as:'modalidades',
    foreignKey: 'idmodalidad',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

modalidad.belongsToMany(horario, {
    through: 'horarios_modalidades',
    as: 'horarios',
    foreignKey: 'idhorario',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default horarios_modalidades;