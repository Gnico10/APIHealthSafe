
import sequelize from "../db/connection";
import { DataTypes } from 'sequelize';
import estadoturno from './estadoturno';
import pago from './pago';
import agenda from "./agenda";
import paciente from "./paciente";
import profesional from "./profesional";
import modalidad from "./modalidad";
import obrasocial from "./obrasocial";

const turno = sequelize.define('turno', {
    idturno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: DataTypes.DATE,
    fechasolicita: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idpago: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: pago,
            key: 'idpago',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    idagenda: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: agenda,
            key: 'idagenda',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    idpaciente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {

            model: paciente,
            key: 'idpaciente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
    idprofesional: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: profesional,
            key: 'idprofesional'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
    idmodalidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: modalidad,
            key: 'idmodalidad'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
    idobrasocial: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: obrasocial,
            key: 'idobrasocial'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    },
},
{
    tableName: 'turnos'
});

turno.belongsTo(pago,{
    foreignKey: 'idpago',
    as: 'pago',
});

turno.belongsTo(estadoturno,{
    foreignKey: 'idestadoturno',

    as: 'estadoturno',
});

turno.belongsTo(agenda,{
    foreignKey: 'idagenda',
    as: 'agenda',
});

turno.belongsTo(paciente,{
    foreignKey: 'idpaciente',
    as: 'paciente',
});

turno.belongsTo(profesional,{
    foreignKey: 'idprofesional',
    as: 'profesional',
});

turno.belongsTo(modalidad,{
    foreignKey: 'idprofesional',
    as: 'modalidad',
});

turno.belongsTo(obrasocial,{
    foreignKey: 'idobrasocial',
    as: 'obrasocial',
});

export default turno;