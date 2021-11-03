import { Model } from 'sequelize/types';

interface IHorarioModalidad extends Model{
    idmodalidad? : number,
    idhorario? : number,
};

export default IHorarioModalidad;