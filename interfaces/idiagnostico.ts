import { Model } from "sequelize/types";
import IMedicamento from "./iIndicacionMedicamento";


interface idiagnostico extends Model{
    idDiagnostico?: number,
    nombre? : string,
    descripcion? : string,
    idmedicamento?: number,
    idindicacionGeneral?: number,
    medicamentos: IMedicamento[];
    addMedicamento(medicamento: IMedicamento): void;
};

export default idiagnostico;