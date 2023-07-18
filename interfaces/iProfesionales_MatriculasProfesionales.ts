import { Model } from 'sequelize/types';

interface IProfesionales_MatriculasProfesionales extends Model{
    idprofesionalesmatriculasprofesionales: string,
    idprofesional? : number,
    idmatriculaprofesiona? : number,
};

export default IProfesionales_MatriculasProfesionales;