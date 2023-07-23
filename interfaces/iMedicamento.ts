import { Model } from "sequelize/types";

interface iMedicamento extends Model{
    idmedicamento? : number,
    nombre? : string,
    descripcion? : string,
    monodroga? : string,
    presentacion? : string,
};

export default iMedicamento;