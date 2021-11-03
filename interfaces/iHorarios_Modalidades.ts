import { Model } from 'sequelize/types';

// tslint:disable-next-line: class-name
interface IHorarios_Modalidades extends Model{
    idhorariosmodalidades? : number,
    idmodalidad? : number,
    idhorario? : number,
};

export default IHorarios_Modalidades;