import { Model } from 'sequelize/types';

interface IIndicacion extends Model{
    idindicacion? : number,
    descripcion? : string
};

export default IIndicacion;