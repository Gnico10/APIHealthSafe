import { Model } from "sequelize/types";

interface IProfesional extends Model{
    idprofesional? : number,
    descripcion? : string,
    idusuario? : number,
    iddireccion? : number,
};

export default IProfesional;