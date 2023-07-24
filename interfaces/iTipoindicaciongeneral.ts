import { Model } from 'sequelize/types';

interface ITipoindicaciongeneral extends Model{
    idtipoindicaciongeneral? : number,
    descripcion? : string,
};

export default ITipoindicaciongeneral;