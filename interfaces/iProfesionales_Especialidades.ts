import { Model } from "sequelize/types";

interface IProfesionales_Especialidades extends Model{
    idprofesionalesespeciales: number,
    aniootorgamiento? : number,
    idcolegiomedico? : number
    idprofesional? : number,
    idespecialidad? : number
};

export default IProfesionales_Especialidades;