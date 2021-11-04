import { Model } from 'sequelize/types';

interface ICitamedica extends Model{
    idcitamedica? : number,
    fecha? : Date,
    idturno? : number,
};

export default ICitamedica;