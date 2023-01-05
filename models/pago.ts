import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IPago from '../interfaces/iPago';

const pago = sequelize.define<IPago>('pago',
    {
        idpago: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        fechahora: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: 'pagos'
    }
);

export default pago;