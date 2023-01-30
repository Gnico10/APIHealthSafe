import { IntegerDataType, Model } from 'sequelize/types';

interface IAgenda extends Model{
    idagenda? : number,
    fechadesde? : Date,
    fechahasta? : Date,
    horainicio? : string,
    horafin? : string,
    duracion? : number,
    precio? : number,
    idprofesional? : number,
    idmodalidad? : number,
    idconsultorio? : number,
};

export default IAgenda;