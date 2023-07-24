import { Model } from 'sequelize/types';

interface iRegistrohistoriaclinica extends Model{
    idregistrohistoriaclinica? : number,
    idpaciente? : number,
    idturno? : number,
    idprofesional? : number
};

export default iRegistrohistoriaclinica;
