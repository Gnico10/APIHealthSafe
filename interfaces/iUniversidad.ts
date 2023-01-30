import { Model } from 'sequelize/types';

interface IUniversidad extends Model{
    iduniversidad? : number,
    nombre? : string,
    idpais? : number,
};

export default IUniversidad;