import { Model } from 'sequelize/types';

interface IPais extends Model{
    idpais? : number,
    descripcion? : string
};

export default IPais;