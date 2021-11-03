import { Model } from "sequelize/types";

interface IProfesional extends Model{
    idprofesional? : number,
    matriculanacional? : Text,
    matriculaprovincial? : Text,
    nombre? : string,
    apellido? : string,
    email? : string,
    fechanacimiento? : Date,
    dni? : number
};

export default IProfesional;