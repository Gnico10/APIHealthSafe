import { Model } from "sequelize/types";

interface iIndicaciongeneral extends Model{
    idindicaciongeneral? : number,
    tipo? : string,
    detalle? : string,
    iddiagnostico? : number,
};
export default iIndicaciongeneral;
