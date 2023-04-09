import { Model } from 'sequelize/types';

interface ITurno extends Model{
    idturno? : number,
    fecha? : Date,
    horainicio? : string,
    horafin? : string,
    fechasolicita? : Date,
    idprecio? : string,
    idagenda? : number,
    idPaciente? : number,
    idprofesional? : number,
    idmodalidad? : number,
    idconsultorio? : number,
};

export default ITurno;