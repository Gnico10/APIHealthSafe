import { Model } from "sequelize/types";

interface iIndicacionmedicamento extends Model{
    idindicacionmedicamento? : number,
    dosis? : string,
    periodicidad? : string,
    duraciontratamiento? : string,
    observaciones? : string,
    iddiagnostico? : number,
    idmedicamento? : number,
    cantidad? : string,
};

export default iIndicacionmedicamento;
