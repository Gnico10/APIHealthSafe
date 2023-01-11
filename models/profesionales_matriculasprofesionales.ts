import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

import IProfesionales_MatriculasProfesionales from '../interfaces/iProfesionales_MatriculasProfesionales';

import matriculaprofesional from './matriculaprofesional';
import profesional from './profesional';

const profesionales_matriculasprofesionales = sequelize.define<IProfesionales_MatriculasProfesionales>('Profesionales_MatriculasProfesionales',
    { 
        idprofesionalesmatriculasprofesionales: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulogrado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        anio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                len: [4, 4] // number of 4 digits
            }
        }
    },
    {
        tableName: 'profesionales_matriculasprofesionales'
    }
);

profesional.belongsToMany(matriculaprofesional, {
    through: profesionales_matriculasprofesionales,
    as: 'matriculas_profesionales',
    foreignKey: 'idmatriculaprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

matriculaprofesional.belongsToMany(profesional, {
    through: profesionales_matriculasprofesionales,
    as: 'profesionales',
    foreignKey: 'idprofesional',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default profesionales_matriculasprofesionales;