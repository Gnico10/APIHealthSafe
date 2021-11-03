import { Model } from 'sequelize/types';

// tslint:disable-next-line: class-name
interface IProfesionales_Obrassociales extends Model{
    idprofesionalesobrassociales? : number,
    idprofesional? : number,
    idobrasocial? : number,
};

export default IProfesionales_Obrassociales;