import { Model } from 'sequelize/types';

interface iRegistroHistoriaClinica extends Model{
    idRegistroHistoriaClinica? : number,
    fechahora? : Date,
    idiagnostico?: number,
    
};

export default iRegistroHistoriaClinica;