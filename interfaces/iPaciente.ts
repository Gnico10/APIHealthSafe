import { Model } from "sequelize/types";

interface IPaciente extends Model{
    idpaciente? : number
};

export default IPaciente;