import { Model } from "sequelize/types";

interface IDireccion extends Model{
    iddireccion? : number,
    calle? : string,
    piso? : string,
    numero? : string,
};

export default IDireccion;