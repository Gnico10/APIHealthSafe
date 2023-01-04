import { Model } from 'sequelize/types';

// tslint:disable-next-line: class-name
interface IProfesionales_Consultorios extends Model{
    idprofesionalesconsultorios? : number,
    idconsultorio? : number
    idprofesional? : number,
};

export default IProfesionales_Consultorios;