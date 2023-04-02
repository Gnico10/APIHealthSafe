import { Model } from "sequelize/types";

interface iIndicacionMedicamento extends Model{
    idindicacionMedicamento? : number,
    dosis? : string,
    periodicidad? : string,
    duracionTratamiento?: string,
    observaciones?: string,

};

export default iIndicacionMedicamento;