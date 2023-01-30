import { Model } from 'sequelize/types';

interface IProfesionales_MatriculasProfesionales extends Model{
    idprofesionalesmatriculasprofesionales: string,
    titulogrado? : string,
    aniootorgamiento? : number,
    idprofesional? : number,
    idmatriculaprofesiona? : number,
};

export default IProfesionales_MatriculasProfesionales;