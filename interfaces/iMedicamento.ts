import { Model } from "sequelize/types";
import iIndicacionMedicamento from "./iIndicacionMedicamento";

interface iMedicamento extends Model{
    idMedicamento: number,
    nombre? : string,
    descripcion? : string,
    monodroga?: string,
    presentacion?: string,
    cantidad?: string,
     Indicacion?: iIndicacionMedicamento,
  setIndicacion: (Indicacion: iIndicacionMedicamento) => Promise<void>;

};

export default iMedicamento;