import { Model } from 'sequelize/types';

interface IEstadoturno extends Model{
    idestadoturno? : number,
    descripcion? : string,
};

export default IEstadoturno;