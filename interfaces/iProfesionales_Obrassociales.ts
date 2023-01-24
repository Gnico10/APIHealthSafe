import { Model } from 'sequelize/types';

// tslint:disable-next-line: class-name
interface IProfesionales_Obrassociales extends Model{
    idprofesionalesobrassociales? : number,
    idobrasocial? : number,
    idprofesional? : number,
};

export default IProfesionales_Obrassociales;