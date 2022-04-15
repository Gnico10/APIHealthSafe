import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesionales_Especialidades from '../interfaces/iProfesionales_Especialidades';

import profesional from "./profesional";
import especialidad from "./especialidad";

// tslint:disable-next-line: variable-name
const profesionales_especialidades = sequelize.define('Profesionales_Especialidades',
    {
        idprofesional: {
            type: DataTypes.INTEGER,
            references: {
                model: profesional,
                key: 'idprofesional'
            }
        },
        idespecialidad: {
            type: DataTypes.INTEGER,
            references: {
                model: especialidad,
                key: 'idespecialidad'
            }
        }
    },
    {
        tableName: 'profesionales_especialidades'
    }
);

profesional.belongsToMany(especialidad,{
    through: profesionales_especialidades,
    as: 'especialidades'
});

especialidad.belongsToMany(profesional,{
    through: profesionales_especialidades,
    as: 'profesionales'
});

export default profesionales_especialidades;