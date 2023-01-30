import { Model } from "sequelize/types";

interface IDireccion extends Model{
    iddireccion? : number,
    calle? : string,
    piso? : string,
    numero? : string,
    codpostal? : string,
};

export default IDireccion;