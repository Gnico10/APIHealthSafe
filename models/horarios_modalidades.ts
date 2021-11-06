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
            autoIncrement: true,
        },
        idmodalidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: modalidad,
                key: 'idmodalidad'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idhorario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: horario,
                key: 'idhorario',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'horarios_modalidades'
    }
);

horario.belongsToMany(modalidad,{
    through: 'horarios_modalidades',
    foreignKey: 'idmodalidad',
    otherKey: 'idhorario',
    as:'modalidades'
});

modalidad.belongsToMany(horario,{
    through: 'horarios_modalidades',
    foreignKey: 'idhorario',
    otherKey: 'idmodalidad',
    as: 'horarios'
});

export default horarios_modalidades;