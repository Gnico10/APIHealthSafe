import { Model } from 'sequelize/types';

interface IMatriculaprofesional extends Model{
    idmatriculaprofesional? : number,
    numero? : number,
    aniootorgamiento? : number
    idtipomatricula? : number,
    iduniversidad? : number,
    idtitulogrado? : number,
};

export default IMatriculaprofesional;
