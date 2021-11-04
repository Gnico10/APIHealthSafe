import { Model } from 'sequelize/types';

interface ICalificacion extends Model{
    idcalificacion? : number,
    numcalificacion? : number,
    comentario? : string,
    idpaciente? : number,
    idprofesional? : number,
};

export default ICalificacion;