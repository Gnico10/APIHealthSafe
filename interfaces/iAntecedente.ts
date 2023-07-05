import { Model } from "sequelize/types";

interface IAntecedente extends Model{
    idantecedente? : number,
    idtipoantecedente? : number,
    idpaciente? : number,
    descripcion? : string
};

export default IAntecedente;