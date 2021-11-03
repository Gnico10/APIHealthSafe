import { Model } from "sequelize/types";

interface IConsultorio extends Model{
    idconsultorio? : number,
    descripcion? : string,
    iddireccion? : number,
};

export default IConsultorio;