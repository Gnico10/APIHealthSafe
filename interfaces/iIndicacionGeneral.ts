import { Model } from "sequelize/types";

interface iIndicacionGeneral extends Model{
    idindicacion? : number,
    tipo? : string,
    detalle? : string,

};
export default iIndicacionGeneral;