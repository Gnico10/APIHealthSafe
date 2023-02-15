
import sequelize from "../db/connection";
import { DataTypes } from 'sequelize';

import ITurno from "../interfaces/iTurno";

import agenda from "./agenda";
import paciente from "./paciente";
import modalidad from "./modalidad";
import profesional from "./profesional";
import consultorio from "./consultorio";

const turno = sequelize.define<ITurno>('turno', {
    idturno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horainicio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horafin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechasolicita: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    idprecio: { // Mercado Libre.
        type: DataTypes.STRING,
        allowNull: true
    },
     idprofesional: {
         type: DataTypes.INTEGER,
         allowNull: false
    },
    idpaciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idagenda: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
   
    tableName: 'turnos'
});

turno.belongsTo(agenda, {
    foreignKey: 'idagenda',
    as: 'agenda',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

turno.belongsTo(paciente, {
    foreignKey: 'idpaciente',
    as: 'paciente',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

turno.belongsTo(profesional, {
    foreignKey: 'idprofesional',
    as:'profesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
      
});

turno.belongsTo(modalidad, {
    foreignKey: 'idmodalidad',
    as: 'modalidad',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

turno.belongsTo(consultorio, {
    foreignKey: 'idconsultorio',
    as: 'consultorio',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default turno;