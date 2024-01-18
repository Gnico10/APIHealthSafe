import { DataTypes } from 'sequelize';
import sequelize from "../db/connection";

import ICuentaMercadoPago from '../interfaces/iCuentaMercadoPago';
import Profesional from './profesional';

const cuentamercadopago = sequelize.define<ICuentaMercadoPago>('cuentamercadopago',
    {
        idcuentamercadopago: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accesstoken: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        tokentype: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expiresin: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userid: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        refreshtoken: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        publickey: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        updatedat: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idprofesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'cuentamercadopago'
    }
);

cuentamercadopago.belongsTo(Profesional, {
    foreignKey: 'idprofesional',
    as: 'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });  

export default  cuentamercadopago;
