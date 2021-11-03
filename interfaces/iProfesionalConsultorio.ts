import { Model } from 'sequelize/types';

interface IProfesionalConsultorio extends Model{
    idprofesiona? : number,
    idconsultorio? : number
}

export default IProfesionalConsultorio;