import { Model } from "sequelize/types";

interface iIndicaciongeneral extends Model{
    idindicaciongeneral? : number,
    detalle? : string,
    iddiagnostico? : number,
    idtipoindicaciongeneral? : number
};
export default iIndicaciongeneral;
