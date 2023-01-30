import { Model } from "sequelize/types";

interface IUsuario extends Model {
    idusuario? : number,
    correo? : string,
    contrasena? : string,
    dni? : number,
    nombre? : string,
    apellido? : string,
    fechanacimiento? : Date,
    sexo? : string,
    imgperfil? : string,
    imgdnifrente? : string,
    imgdnidorso? : string,
    idrol? : number,
}

export default IUsuario;
