import { Model } from "sequelize/types";

// tslint:disable-next-line: class-name
interface IProfesionales_Especialidades extends Model{
    idprofesionalesespecialidades? : number,
    idprofesional? : number,
    idespecialidad? : number
};

export default IProfesionales_Especialidades;