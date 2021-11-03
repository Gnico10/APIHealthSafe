import { Model } from 'sequelize/types';

interface IHistoriaClinica extends Model{
    idhistorialclinica? : number;
    descripcion? : string,
    idpaciente? : number,
};

export default IHistoriaClinica;