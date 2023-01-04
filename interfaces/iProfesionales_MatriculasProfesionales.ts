import { Model } from 'sequelize/types';

interface IProfesionales_MatriculasProfesionales extends Model{
    idprofesionalesmatriculasprofesionales: string;
    titulogrado? : string,
    ano? : number
    idmatriculaprofesiona? : number,
    idprofesional? : number,
};

export default IProfesionales_MatriculasProfesionales;