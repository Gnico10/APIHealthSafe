import { Model } from 'sequelize/types';

interface IAgenda extends Model{
    idagenda? : number,
    descripcion? : string,
    fechadesde? : Date,
    fechahasta? : Date,
    idprofesional? : number,
};

export default IAgenda;