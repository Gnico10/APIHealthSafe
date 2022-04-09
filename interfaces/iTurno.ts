import { Model } from 'sequelize/types';

interface ITurno extends Model{
    idturno? : number,
    fecha? : Date,
    fechasolicita? : Date,
    idpago? : number,
    idestadoturno? : number,
    idagenda? : number,
    idpaciente? : number,
    idprofesional? : number,
    idmodalidad? : number,
    idobrasocial? : number,
};

export default ITurno;