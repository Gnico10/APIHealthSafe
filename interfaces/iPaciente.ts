import { Model } from "sequelize/types";

interface IPaciente extends Model{
    idpaciente? : number,
    nombre? : string,
    apellido? : string,
    email? : string,
    fechanacimiento? : Date,
    dni? : number
};

export default IPaciente;