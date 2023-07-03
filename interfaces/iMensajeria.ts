import { Model } from "sequelize/types";

interface IMensajeria extends Model{
    idmensajeria? : number,
    idPaciente? : number,
    idprofesional? : number,
};

export default IMensajeria;