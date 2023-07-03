import { Model } from 'sequelize/types';

interface ICalificacion extends Model{
    idcalificacion? : number,
    numcalificacion? : number,
    comentario? : string,
    idPaciente? : number,
    idprofesional? : number,
};

export default ICalificacion;