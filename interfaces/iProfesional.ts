import { Model } from "sequelize/types";

interface IProfesional extends Model{
    idprofesional? : number
};

export default IProfesional;