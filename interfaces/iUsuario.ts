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
    imgperfil? : Blob,
    imgdnifrente? : Blob,
    imgdnidorso? : Blob
}

export default IUsuario;
