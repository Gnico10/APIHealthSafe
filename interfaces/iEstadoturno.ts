import { Model } from 'sequelize/types';

interface IEstadoturno extends Model{
    idestado? : number,
    descripcion? : string,
};

export default IEstadoturno;