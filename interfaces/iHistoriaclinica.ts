import { Model } from 'sequelize/types';

interface IHistoriaClinica extends Model{
    idhistoriaclinica? : number,
    peso? : number,
    edad? : number,
};

export default IHistoriaClinica;