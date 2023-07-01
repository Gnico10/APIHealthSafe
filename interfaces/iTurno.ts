import { Model } from 'sequelize/types';

interface ITurno extends Model{
    idturno? : number,
    fecha? : Date,
    horainicio? : string,
    horafin? : string,
    fechasolicita? : Date,
    precio? : number,
    idpagomercadopago? : string,
    idespecialidad? : number,
    idagenda? : number,
    idpaciente? : number,
};

export default ITurno;