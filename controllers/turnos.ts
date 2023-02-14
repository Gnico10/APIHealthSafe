import {Request, Response} from 'express';

import Agenda from '../models/agenda';
import Turno from '../models/turno';


//get: all turnos
export const getTurnos = async (req: Request, res: Response) => {
    const turnos = await Turno.findAll();
    res.json({turnos});
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
        idturno,
        fecha,
        horainicio,
        horafin,
        idprecio,
        idagenda,
        idpaciente,
        idprofesional,
        idmodalidad,
        idconsultorio
    } = req.body;
    try { 
        //TODO: Validaciones
        let agenda : any = await Agenda.findByPk(idagenda);
        if (!agenda) {
            return res.status(400).json({
                msg: 'La agenda no existe.'
            });

        }
       
        let fechaTurno = new Date(fecha);
        let fechadesdeAgenda = new Date(agenda.fechadesde);
        fechaTurno.setHours(0,0);
        fechadesdeAgenda.setHours(0,0);
        let fechahastaAgenda = new Date(agenda.fechahasta);
        if (fechaTurno.getTime() < fechadesdeAgenda.getTime() ||
            fechaTurno.getTime() > fechahastaAgenda.getTime()) {
            return res.status(400).json({
                msg: 'La fecha no cumple con la configuración de la agenda.'
            });
            
        }
        let horaInicioTurno = horainicio.split(':');
        let horaInicioAgenda = agenda.horainicio.split(':');
        if (horaInicioTurno[0] < horaInicioAgenda[0]) { // horas
            return res.status(400).json({
                msg: 'La hora inicio no cumple con la configuración de la agenda.'
            });
        }        

        if (horaInicioTurno[0] == horaInicioAgenda[0] && // horas
            horaInicioTurno[1] < horaInicioAgenda[1]) { // minutos
            return res.status(400).json({
                msg: 'Los minutos de la hora inicio no cumple con la configuración de la agenda.'
            });
        }

        let horaFinTurno = horafin.split(':');
        let horaFinAgenda = agenda.horafin.split(':');
        if (horaFinTurno[0] > horaFinAgenda[0]) { // horas
            return res.status(400).json({
                msg: 'La hora fin no cumple con la configuración de la agenda.'
            });
        }

        if (horaFinTurno[0] == horaFinAgenda[0] && // horas
            horaFinTurno[1] > horaFinAgenda[1]) { // minutos
            return res.status(400).json({
                msg: 'Los minutos de la hora fin no cumple con la configuración de la agenda.'
            });
        }
        // validación si la fecha actual es anterior a la fecha que se intenta crear un turno
       let  fechaActual = new Date();
        if(fechaActual < fechaTurno ) {
            return res.status(400).json({
                msg: 'La fecha ingresada es anterior a la fecha actual, debe ingresar una fecha posterior'
            })

        } 
        //validación si el turno que se intenta crear existe o no
            await Turno.count({where: {fechaTurno:fechaTurno}}).then(count => {
            if(count != 0){
              return res.status(400).json({
                msg: 'El turno existe.'
              });
            }
          });  
    
              
     
    
    
        //
        
        // Creación de instancia en la base de datos.
        const turno = Turno.build({ 
          
            fecha,
            horainicio,
            horafin,
            idprecio,
            idagenda,
            idpaciente,
            idprofesional,
            idmodalidad,
            idconsultorio 
        });

        await turno.save();

        //TODO: Obtener turno con sus datos y mostrar
        
        res.json({
            msg:'Turno dado de alta',
            turno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el turno.'
        });
    }

}


export const deleteTurno = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Busca el turno según el id
        const turno = await Turno.findByPk(id);
        
        // Validar que el turno exista
        if (!turno) {
            return res.status(404).json({
                msg: `No existe un turno con el ID = ${id}`
            });
        }

        // Elimina el turno
        await turno.destroy();

        res.json({
            msg: 'El turno fué eliminado con éxito.',
            turno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo actualizar el turno.'
        });
    }
}