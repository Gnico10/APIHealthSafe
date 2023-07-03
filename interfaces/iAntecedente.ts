import { Model } from "sequelize/types";

interface IAntecedente extends Model{
    idantecedente? : number,
    idtipoantecedente? : number,
    idPaciente? : number,
    descripcion? : string
};

export default IAntecedente;