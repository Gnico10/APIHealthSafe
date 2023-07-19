import { Model } from "sequelize/types";

interface IAntecedente extends Model{
    idantecedente? : number,
    descripcion? : string,
    nombre? : string,
    idtipoantecedente? : number,
    idpaciente? : number,
    idprofesional? : number
};

export default IAntecedente;