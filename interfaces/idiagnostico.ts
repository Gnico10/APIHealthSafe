import { Model } from "sequelize/types";

interface idiagnostico extends Model{
    idDiagnostico?: number,
    nombre? : string,
    descripcion? : string,
    idmedicamento?: number,
    idindicacionGeneral?: number,
};

export default idiagnostico;