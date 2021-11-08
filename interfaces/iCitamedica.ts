import { Model } from 'sequelize/types';

interface ICitamedica extends Model{
    idcitamedica? : number,
    fechayhora? : Date,
    idturno? : number,
};

export default ICitamedica;