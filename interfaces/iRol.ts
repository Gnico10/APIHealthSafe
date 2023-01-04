import { Model } from 'sequelize/types';

interface IRol extends Model{
    idrol? : number,
    descripcion? : string
};

export default IRol;