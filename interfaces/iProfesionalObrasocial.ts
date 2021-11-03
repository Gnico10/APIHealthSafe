import { Model } from 'sequelize/types';

interface IProfesionalObrasocial extends Model{
    idprofesional? : number,
    idobrasocial? : number,
};

export default IProfesionalObrasocial;