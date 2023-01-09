
import sequelize from "../db/connection";
import { DataTypes } from 'sequelize';
import estadoturno from './estadoturno';
// import pago from './pago';
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
    // horainicio,
    // horafin
    fechasolicita: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    precio:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
    }
},
{
    tableName: 'turnos'
});

// turno.belongsTo(pago, {
//     foreignKey: 'idpago',
//     as: 'pago',
//     onUpdate: 'CASCADE',
//     onDelete: 'RESTRICT',
// });

// turno.belongsTo(estadoturno, {
//     foreignKey: 'idestadoturno',
//     as: 'estadoturno',
//     onUpdate: 'CASCADE',
//     onDelete: 'RESTRICT',
// });

// turno.belongsTo(agenda, {
//     foreignKey: 'idagenda',
//     as: 'agenda',
//     onUpdate: 'CASCADE',
//     onDelete: 'RESTRICT',
// });

turno.belongsTo(paciente, {
    foreignKey: 'idpaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

turno.belongsTo(modalidad, {
    foreignKey: 'idmodalidad',
    as: 'modalidad',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

turno.belongsTo(obrasocial, {
    foreignKey: 'idobrasocial',
    as: 'obrasocial',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

export default turno;