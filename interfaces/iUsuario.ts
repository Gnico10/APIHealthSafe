import { Model } from "sequelize/types";

interface IUsuario extends Model {
    dni?: number,
    contrasena?: string,
    imgperfil?: Blob
}

export default IUsuario;
