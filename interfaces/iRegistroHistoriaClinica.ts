import { Model } from 'sequelize/types';

interface iRegistroHistoriaClinica extends Model{
    idRegistroHistoriaClinica? : number,
    fechahora? : Date,
    idDiagnostico?: number,
    
};

export default iRegistroHistoriaClinica;