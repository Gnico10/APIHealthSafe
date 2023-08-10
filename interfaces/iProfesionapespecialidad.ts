import { Model } from 'sequelize/types';

interface IProfesionalespecialidad extends Model{
    idprofesionalespecialidad? : number,
    aniootorgamiento? : number,
    idprofesional? : number,
    idespecialidad? : number,
    idcolegiomedico? : number,
};

export default IProfesionalespecialidad;
