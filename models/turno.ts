
import sequelize from "../db/connection";
import { DataTypes } from 'sequelize';
import estadoturno from './estadoturno';
import pago from './pago';
import agenda from "./agenda";
import paciente from "./paciente";
import modalidad from "./modalidad";
import obrasocial from "./obrasocial";
import ITurno from "../interfaces/iTurno";

const turno = sequelize.define<ITurno>('turno', {
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
    precio:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
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
        allowNull: false,
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

turno.belongsTo(modalidad,{
    foreignKey: 'idprofesional',
    as: 'modalidad',
});

turno.belongsTo(obrasocial,{
    foreignKey: 'idobrasocial',
    as: 'obrasocial',
});

export default turno;