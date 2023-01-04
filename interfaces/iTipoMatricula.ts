import { Model } from 'sequelize/types';

interface ITipoMatricula extends Model{
    idtipomatricula? : number,
    descripcion? : string
};

export default ITipoMatricula;