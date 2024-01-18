import { Model } from "sequelize/types";

interface ICuentaMercadoPago extends Model{
    idcuentamercadopago? : number,
    accesstoken? : string,
    tokentype? : string,
    expiresin? : string,
    userid? : string,
    refreshtoken? : string,
    publickey? : string,
    updatedat? : string,
    idprofesional? : number,
};

export default ICuentaMercadoPago;