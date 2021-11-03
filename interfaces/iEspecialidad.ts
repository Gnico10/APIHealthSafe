import { Model } from "sequelize/types";

interface IEspecialidad extends Model{
    idespecialidad? : number,
    descripcion? : string
};

export default IEspecialidad;