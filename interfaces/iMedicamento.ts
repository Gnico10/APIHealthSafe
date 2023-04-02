import { Model } from "sequelize/types";

interface iMedicamento extends Model{
    idMedicamento: number,
    nombre? : string,
    descripcion? : string,
    monodroga?: string,
    presentacion?: string,
    cantidad?: string,
    idindicacionMedicamento?: number,

};

export default iMedicamento;