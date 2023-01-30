import { Model } from "sequelize/types";

interface IModalidad extends Model{
    idmodalidad? : number,
    descripcion? : string,
};

export default IModalidad;