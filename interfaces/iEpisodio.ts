import { Model } from 'sequelize/types';

interface IEpisodio extends Model{
    idepisodio? : number,
    descripcion? : string,
    fecha? : Date,
    idhistoriaclinica? : number,
    idprescripcion? : number,
    idindicacion? : number,
    idcitamedica? : number,
    idcitamedicaemergencia? : number,
};

export default IEpisodio;