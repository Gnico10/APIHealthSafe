import { Model } from "sequelize/types";

interface IDireccion extends Model{
    iddireccion? : number,
    calle? : string,
    piso? : string,
    manzana? : string,
    lote? : string,
    codposta? : string,
};

export default IDireccion;