import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import IEpisodio from "../interfaces/iEpisodio";

import historiaclinica from './historiaclinica';
import prescripcion from './prescripcion';
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
        }
    },
    {
        tableName: 'episodios'
    }
);

episodio.belongsTo(historiaclinica, {
    foreignKey: 'idhistoriaclinica',
    as: 'historiaclinica',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

episodio.belongsTo(prescripcion, {
    foreignKey: 'idprescripcion',
    as: 'prescripcion',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

episodio.belongsTo(indicacion, {
    foreignKey: 'idindicacion',
    as: 'indicacion',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

episodio.belongsTo(citamedica, {
    foreignKey: 'idcitamedica',
    as: 'citamedica',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

episodio.belongsTo(citamedicaemergencia, {
    foreignKey: 'idcitamedicaemergencia',
    as: 'citamedicaemergencia',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default episodio;