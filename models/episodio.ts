import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IEpisodio from "../interfaces/iEpisodio";

import historiaclinica from './historiaclinica';
import prescripcion from './precripcion';
import indicacion from './indicacion';
import citamedica from './citamedica';
import citamedicaemergencia from './citamedicaemergencia';


const episodio = sequelize.define<IEpisodio>('Episodio',
    {
        idepisodio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: DataTypes.TEXT,
        fechahora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        idhistoriaclinica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: historiaclinica,
                key: 'idhistoriaclinica',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idprescripcion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: prescripcion,
                key: 'idprescripcion',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idindicacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: indicacion,
                key: 'idindicacion',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idcitamedica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: citamedica,
                key: 'idcitamedica',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
        idcitamedicaemergencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: citamedicaemergencia,
                key: 'idcitamedicaemergencia',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'episodios'
    }
);

episodio.belongsTo(historiaclinica,{
    foreignKey: 'idhistoriaclinica',
    as: 'historiaclinica',
});

episodio.belongsTo(prescripcion,{
    foreignKey: 'idprescripcion',
    as: 'prescripcion',
});

episodio.belongsTo(indicacion,{
    foreignKey: 'idindicacion',
    as: 'indicacion',
});

episodio.belongsTo(citamedica,{
    foreignKey: 'idcitamedica',
    as: 'citamedica',
});

episodio.belongsTo(citamedicaemergencia,{
    foreignKey: 'idcitamedicaemergencia',
    as: 'citamedicaemergencia',
});

export default episodio;