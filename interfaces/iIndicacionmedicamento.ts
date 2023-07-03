import { Model } from "sequelize/types";

interface iIndicacionmedicamento extends Model{
    idindicacionmedicamento? : number,
    dosis? : string,
    periodicidad? : string,
    duraciontratamiento?: string,
    observaciones?: string,
};

export default iIndicacionmedicamento;
