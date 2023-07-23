import { Model } from 'sequelize/types';

interface iRegistrohistoriaclinica extends Model{
    idregistrohistoriaclinica? : number,
    fechahora? : Date,
    idpaciente? : number,
    idturno? : number,
    idprofesional? : number
};

export default iRegistrohistoriaclinica;
