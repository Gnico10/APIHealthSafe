import { Model } from 'sequelize/types';

interface IPedidoEmergencia extends Model{
    idpedidoemergencia? : number,
    sintomas? : string,
    fechahora? : Date,
    estado? : string,
    idespecialidad? : number,
    idPaciente? : number, 
};

export default IPedidoEmergencia;