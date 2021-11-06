import { Model } from 'sequelize/types';

interface IPago extends Model{
    idpago? : number,
    fechahora? : Date,
    link? : string
};

export default IPago;