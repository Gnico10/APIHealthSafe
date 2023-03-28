import { Model } from 'sequelize/types';

interface ITipoAntecedente extends Model{
    idtipoantecedente? : number,
    descripcion? : string,
};

export default ITipoAntecedente;