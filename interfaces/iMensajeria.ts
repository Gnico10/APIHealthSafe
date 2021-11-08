import { Model } from "sequelize/types";

interface IMensajeria extends Model{
    idmensajeria? : number,
    idpaciente? : number,
    idprofesional? : number,
};

export default IMensajeria;