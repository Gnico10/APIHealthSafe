import {Request, Response} from 'express';
import Agenda from '../models/agenda';


//get: all agendas
export const getAgendas = async (req: Request, res: Response) => {
    const agendas = await Agenda.findAll();
    res.json({agendas});
}

//get: una sola agenda por id
export const getAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;
    const agenda = await Agenda.findByPk(id);

    if (agenda){
        res.json(agenda);
    } else {
        res.status(404).json({
            msg: `No existe una agenda con id = ${id}`
        });
    }
}
export const postAgenda = async (req: Request, res: Response) => {
    const { configuracionhorario,
             idpago,
             fechadesde, 
             fechahasta,
             idprofesional,
             duracionTurno
               } = req.body;
    try {
      
        // Creación de instancia en la base de datos.
        const agenda = Agenda.build({  
            configuracionhorario,
            idpago,
            fechadesde, 
            fechahasta,
            idprofesional,
            duracionTurno
        });

        await agenda.save();

        res.json({
            msg:'agenda dada de alta',
            agenda
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear la agenda.'
        });
    }

}
export const putAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { contrasena } = req.body;

    try {
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar la agenda.'
        });
    }
}

export const deleteAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const agenda = await Agenda.findByPk(id);
        if (!agenda) {
            return res.status(404).json({
                msg: `No existe un agenda con el id = ${id}`
            });
        }

        await agenda.destroy();

        res.json({
            msg: 'La agenda fué eliminado con éxito.',
            agenda
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar la agenda.'
        });
    }
}