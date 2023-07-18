import { Model } from 'sequelize/types';

interface ITituloGrado extends Model{
    idtitulogrado? : number,
    descripcion? : string,
};

export default ITituloGrado;