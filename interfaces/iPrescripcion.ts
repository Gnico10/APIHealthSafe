import { Model } from 'sequelize/types';

interface IPrescripcion extends Model{
    idprescripcion? : number,
    descripcion? : string,
};

export default IPrescripcion;