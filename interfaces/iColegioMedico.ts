import { Model } from 'sequelize/types';

interface IColegioMedico extends Model{
    idcolegiomedico? : number,
    nombre? : string,
    idpais? : number,
};

export default IColegioMedico;