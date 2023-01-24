import { Model } from 'sequelize/types';

interface IMatriculaProfesional extends Model{
    idmatriculaprofesional? : number,
    numero? : number,
    idtipomatricula? : number
    iduniversidad? : number
};

export default IMatriculaProfesional;