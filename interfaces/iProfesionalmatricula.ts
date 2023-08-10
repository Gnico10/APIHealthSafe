import { Model } from 'sequelize/types';

interface IProfesionalmatricula extends Model{
    idprofesionalmatricula? : number,
    numero? : number,
    aniootorgamiento? : number,
    idprofesional? : number,
    idtipomatricula? : number,
    iduniversidad? : number,
    idtitulogrado? : number,
};

export default IProfesionalmatricula;
