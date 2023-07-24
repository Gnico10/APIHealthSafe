import { Model } from "sequelize/types";

interface iIndicacionmedicamento extends Model{
    idindicacionmedicamento? : number,
    dosis? : string,
    cantidad? : string,
    periodicidad? : string,
    duraciontratamiento? : string,
    observaciones? : string,
    iddiagnostico? : number,
    idmedicamento? : number, 
};

export default iIndicacionmedicamento;
