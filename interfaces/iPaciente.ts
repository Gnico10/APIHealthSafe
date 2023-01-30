import { Model } from "sequelize/types";

interface IPaciente extends Model{
    idpaciente? : number,
    idusuario? : number,
    idhistoriaclinica? : number,
};

export default IPaciente;