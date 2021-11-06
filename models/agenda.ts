import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import IAgenda from '../interfaces/iAgenda';
import profesional from './profesional';

const agenda = sequelize.define<IAgenda>('Agenda',
    {
        idagenda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fechadesde: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fechahasta: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: profesional,
                key: 'idprofesional'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'agendas'
    }
);

agenda.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as:'especialidades'
});

export default agenda;