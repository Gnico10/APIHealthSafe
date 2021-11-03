import { Model } from "sequelize/types";

interface IProfesionalEspecialidad extends Model{
    idprofesional? : number,
    idespecialidad? : number
};

export default IProfesionalEspecialidad;