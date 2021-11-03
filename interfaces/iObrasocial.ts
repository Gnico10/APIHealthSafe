import { Model } from 'sequelize/types';

interface IObrasocial extends Model{
    idobrasocial? : number,
    descripcion? : string
};

export default IObrasocial;