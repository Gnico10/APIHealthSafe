import { Model } from "sequelize/types";

interface IPaciente extends Model{
    idPaciente? : number,
    idusuario? : number,
    idhistoriaclinica? : number,
};

export default IPaciente;