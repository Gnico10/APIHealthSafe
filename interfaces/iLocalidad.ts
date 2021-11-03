import { Model } from "sequelize/types";

interface ILocalidad extends Model{
    codpostal? : string,
    descripcion? : string
};

export default ILocalidad;