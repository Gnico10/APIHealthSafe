import { Model } from 'sequelize/types';

interface IProfesionales_MatriculasProfesionales extends Model{
    idprofesionalesmatriculasprofesionales: string;
    titulogrado? : string,
    aniootorgamiento? : number
    idmatriculaprofesiona? : number,
    idprofesional? : number,
};

export default IProfesionales_MatriculasProfesionales;