import { Model } from "sequelize/types";

interface iMedicamento extends Model{
    idmedicamento? : number,
    nombre? : string,
    descripcion? : string,
    monodroga? : string,
    presentacion? : string,
    cantidad? : string,
    iddiagnostico? : number,
    idindicacionmedicamento? : number,
};

export default iMedicamento;