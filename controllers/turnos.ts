import {Request, Response} from 'express';
import { Op } from 'sequelize';

import Agenda from '../models/agenda';
import Usuario from '../models/usuario';
import Turno from '../models/turno';
import Paciente from '../models/paciente';
import Especialidad from '../models/especialidad';
import Profesional from '../models/profesional';
import Rol from '../models/rol';
import Modalidad from '../models/modalidad';
import Consultorio from '../models/consultorio';
import Direccion from '../models/direccion';
import Localidad from '../models/localidad';

//get: all turnos
export const getTurnos = async (req: Request, res: Response) => {
    const turnos = await Turno.findAll();
    res.json({turnos});
}

export const getTurnos_Paciente = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const turnos = await Turno.findAll({
            where: {
                idpaciente: id,
            },
            include: [
                {
                    model: Agenda,
                    as: 'agenda',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Profesional,
                        as: 'profesional',
                        include: [{
                            model: Usuario,
                            as: 'usuario',
                            include: [{
                                model: Rol,
                                as: 'rol'
                            }]
                        }]
                    }, {
                        model: Modalidad,
                        as: 'modalidad'
                    }, {
                        model: Consultorio,
                        as: 'consultorio',
                        required: false,
                        include: [{
                            model: Direccion,
                            as: 'direccion',
                            include: [{
                                model: Localidad,
                                as: 'localidad'
                            }]
                        }]
                    }]
                },
                {
                  model: Especialidad,
                  as: 'especialidad'  
                },
                {
                    model: Paciente,
                    as: 'paciente',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Usuario,
                        as: 'usuario',
                        include: [{
                            model: Rol,
                            as: 'rol'
                        }]
                    }]
                }
            ]
        });
        

        res.json({turnos});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los turnos del paciente'
        });
    }
}

//get: un solo turno por id
export const getTurno = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Busca el turno según el id
    const turno = await Turno.findByPk(id);

    // Si el turno existe, lo devuelve
    if (turno){
        res.json(turno);
    } else {
        res.status(404).json({
            msg: `No existe un turno con id = ${id}`
        });
    }
}

export const postTurno = async (req: Request, res: Response) => {
    // Obtiene los datos del turno
    const { 
        fecha,
        horainicio,
        horafin,
        idpagomercadopago,
        idagenda,
        idpaciente,
        idespecialidad,
    } = req.body;

    try { 
        // Validaciones
        let especialidad: any = await Especialidad.findByPk(idespecialidad);
        if (!especialidad) {
            return res.status(400).json({
                msg: 'La especialidad no existe'
            });
        }

        let agenda : any = await Agenda.findByPk(idagenda);
        if (!agenda) {
            return res.status(400).json({
                msg: 'La agenda no existe'
            });
        }
       
        let fechaturno = new Date(`${fecha}T00:00:00`);
        let fechadesdeAgenda = new Date(agenda.fechadesde);
        let fechahastaAgenda = new Date(agenda.fechahasta);
        if (fechaturno.getTime() < fechadesdeAgenda.getTime() ||
            fechaturno.getTime() > fechahastaAgenda.getTime()) {
            return res.status(400).json({
                msg: 'La fecha no cumple con la configuración de la agenda'
            });
        }

        let horaInicioTurno = horainicio.split(':');
        let horaInicioAgenda = agenda.horainicio.split(':');
        if (horaInicioTurno[0] < horaInicioAgenda[0]) { // horas
            return res.status(400).json({
                msg: 'La hora inicio no cumple con la configuración de la agenda'
            });
        }

        if (horaInicioTurno[0] == horaInicioAgenda[0] && // horas
            horaInicioTurno[1] < horaInicioAgenda[1]) { // minutos
            return res.status(400).json({
                msg: 'Los minutos de la hora inicio no cumple con la configuración de la agenda'
            });
        }

        let horaFinTurno = horafin.split(':');
        let horaFinAgenda = agenda.horafin.split(':');
        if (horaFinTurno[0] > horaFinAgenda[0]) { // horas
            return res.status(400).json({
                msg: 'La hora fin no cumple con la configuración de la agenda'
            });
        }

        if (horaFinTurno[0] == horaFinAgenda[0] && // horas
            horaFinTurno[1] > horaFinAgenda[1]) { // minutos
            return res.status(400).json({
                msg: 'Los minutos de la hora fin no cumple con la configuración de la agenda'
            });
        }

        // validación si la fecha actual es anterior a la fecha que se intenta crear un turno
        let fechaActual = new Date();

        if(fechaActual.getTime() > fechaturno.getTime()) {
            return res.status(400).json({
                msg: 'La fecha ingresada es anterior a la fecha actual, debe ingresar una fecha posterior'
            });
        }

        if (horaInicioTurno[0] > horaFinTurno[0])  { // horas
        return res.status(400).json({
               msg: 'La hora de inicio no puede ser mayor a la hora de fin'
            });
        }

        if (horaInicioTurno[0] == horaFinTurno[0]  &&  // horas
            horaInicioTurno[1] > horaFinTurno[1]) { // minutos
            return res.status(400).json({
                msg: 'Los minutos de inicio no puede ser mayor a los minutos de fin'
            });
        }

        // Obtener los turnos existentes para la fecha dada y el rango de horarios
        const turnosExistentes = await Turno.findAll({
            where: {
                fecha,
                [Op.and]: [
                    {horainicio: {[Op.between]: [horainicio, horafin]}},
                    {horafin: {[Op.between]: [horainicio, horafin]}}
                ]
            }
        });

        // Comprobar si existen turnos para el rango de horarios
        if (turnosExistentes.length > 0) {
            return res.status(400).json({
                msg: 'Ya existe un turno para este rango de horarios en la fecha dada'
                }); 
        }

        // Creación de instancia en la base de datos.
        const turno = Turno.build({ 
            fecha,
            horainicio,
            horafin,
            idpagomercadopago,
            idagenda,
            idpaciente,
            idespecialidad
        });

        await turno.save();

        res.json({
            msg:'Turno dado de alta',
            turno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error General. No se pudo crear el turno'
        });
    }
}


export const deleteTurno = async (req: any, res: Response) => {
    const { id } = req.params;

    try {
        // Validar que el turno exista
        const turno : any = await Turno.findByPk(id);
        if (!turno) {
            return res.status(404).json({
                msg: `No existe un turno con el ID = ${id}`
            });
        }

        // Validar que lo esté tratando de eliminar el paciente que lo creó.
        const paciente = await Paciente.findOne({
            where: { idusuario: req.idUsuarioToken }
        });
        if (!paciente) {
            return res.status(404).json({
                msg: 'Solamente el usuario paciente puede eliminar este turno'
            });
        }

        if (turno.idpaciente != paciente.idpaciente) {
            const usuario = await Usuario.findByPk(paciente.idusuario);
            return res.status(404).json({
                msg: `El turno solo puede ser eliminado por el paciente ${usuario?.nombre} ${usuario?.apellido}`
            });
        }

        // El turno solo puede ser eliminado con un día o más de antelación.
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const fechaTurno = new Date(turno.fecha);
        if (fechaTurno.getTime() <= tomorrow.getTime()){
            return res.status(404).json({
                msg: ` El turno solo puede ser eliminado con un día o más de antelación`
            }); 
        }

        // Elimina el turno
        await turno.destroy();

        res.json({
            msg: 'El turno fué eliminado con éxito',
            turno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo actualizar el turno'
        });
    }
}