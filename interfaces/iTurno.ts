import { Model } from 'sequelize/types';

interface ITurno extends Model{
    idturno? : number,
    idfecha? : Date,
    idfechasolicita? : Date,
    idlinkpago? : string,
    idestado? : number,
    idagenda? : number,
    idpaciente? : number,
    idprofesional? : number,
};

export default ITurno;