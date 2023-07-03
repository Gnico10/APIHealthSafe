import { Model } from 'sequelize/types';

interface IMatriculaprofesional extends Model{
    idmatriculaprofesional? : number,
    numero? : number,
    idtipomatricula? : number,
    iduniversidad? : number,
};

export default IMatriculaprofesional;