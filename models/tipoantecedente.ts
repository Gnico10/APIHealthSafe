import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import ITipoAntecedente from '../interfaces/iTipoAntecedente';

const tipoantecedente = sequelize.define<ITipoAntecedente>('TipoAntecedente',
    { 
        idtipoantecedente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName: 'tiposantecedente'
    }
);

export default tipoantecedente;