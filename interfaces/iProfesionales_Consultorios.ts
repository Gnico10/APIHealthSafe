import { Model } from 'sequelize/types';

// tslint:disable-next-line: class-name
interface IProfesionales_Consultorios extends Model{
    idprofesionalesconsultorios? : number,
    idprofesiona? : number,
    idconsultorio? : number
};

export default IProfesionales_Consultorios;