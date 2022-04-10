import {Request, Response} from 'express';
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
    const { fechasolicita,
             idpago,
             idagenda, 
             idpaciente,
             idmodalidad, 
             idobrasocial  } = req.body;
    try {
        //TODO: Validaciones
        
        // Creación de instancia en la base de datos.
        const turno = Turno.build({  fechasolicita,
               idpago,
               idagenda,
               idpaciente,
               idmodalidad,
               idobrasocial });

        await turno.save();
        
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

export const putTurno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fechasolicita,
            idpago,
            idagenda, 
            idpaciente, 
            idprofesional, 
            idmodalidad, 
            idobrasocial} = req.body;

    try {
        // Busca el turno según el id
        const turno = await Turno.findByPk(id);

        // Validar que el turno exista
        if (!turno) {
            return res.status(404).json({
                msg: `No existe un Turno con el ID = ${id}`
            });
        }

        // Actualiza el turno
        await turno.update({fechasolicita,
                            idpago,
                            idagenda, 
                            idpaciente, 
                            idprofesional, 
                            idmodalidad, 
                            idobrasocial});

        res.json({
            msg:'Turno actualizado con éxito.',
            turno
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo actualizar el turno.'
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