import { Model } from 'sequelize/types';

interface ICitamedicaemergencia extends Model{
    idcitamedicaemergencia? : number,
    fechahora? : Date,
    idpaciente? : number,
    idprofesional? : number,
};

export default ICitamedicaemergencia;