import { Model } from 'sequelize/types';

interface ICitamedicaemergencia extends Model{
    idcitamedicaemergencia? : number,
    fechahora? : Date,
    idPaciente? : number,
    idprofesional? : number,
};

export default ICitamedicaemergencia;