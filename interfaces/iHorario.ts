import { Model } from 'sequelize/types';

interface IHorario extends Model{
    idhorario? : number,
    horainicio? : Date,
    horafin? : Date,
    idagenda? : number,
};

export default IHorario;