import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IProfesionales_MatriculasProfesionales from '../interfaces/iProfesionales_MatriculasProfesionales';

import MatriculaProfesional from './matriculaprofesional';
import Profesional from './profesional';
import TituloGrado from './titulogrado';

const profesionales_matriculasprofesionales = sequelize.define<IProfesionales_MatriculasProfesionales>('Profesionales_MatriculasProfesionales',
    { 
        idprofesionalesmatriculasprofesionales: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: 'profesionales_matriculasprofesionales'
    }
);

Profesional.belongsToMany(MatriculaProfesional, {
    through: profesionales_matriculasprofesionales,
    as: 'PM_matriculas_profesionales',
    foreignKey: 'idprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

MatriculaProfesional.belongsToMany(Profesional, {
    through: profesionales_matriculasprofesionales,
    as: 'PM_profesionales',
    foreignKey: 'idmatriculaprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default profesionales_matriculasprofesionales;