import { Model } from "sequelize/types";

interface IMensaje extends Model{
    idmensaje? : number,
    mensaje? : string,
    fechahora? : Date,
    idmensajeria? : number,
    rolemisor? : string,
    idemisor? : string,
    tipomensaje? : string,
};

export default IMensaje;