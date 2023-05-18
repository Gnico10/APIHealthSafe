import { Model } from "sequelize/types";

interface IMensaje extends Model{
    idmensaje? : number,
    mensaje? : string,
    fechahora? : Date,
    idmensajeria? : number,
    idusuarioemisor? : number
};

export default IMensaje;