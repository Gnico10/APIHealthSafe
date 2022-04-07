import {Request, Response} from 'express';
import Turno from '../models/turno';
import bcryptjs  from 'bcryptjs';

//get: all turnos
export const getTurnos = async (req: Request, res: Response) => {
    const turnos = await Turno.findAll();
    res.json({turnos});
}

//get: un solo turno por id
export const getTurno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const turno = await Turno.findByPk(id);

    if (turno){
        res.json(turno);
    } else {
        res.status(404).json({
            msg: `No existe un Turno con dni = ${id}`
        });
    }
}

export const postTurno = async (req: Request, res: Response) => {
    const { fechasolicita, idpago, idagenda, idpaciente, idprofesional, idmodalidad, idobrasocial  } = req.body;

    try {
        // Validaciones
        const existeTurno = await Turno.findOne({
            where: {idpaciente}
        });

        if (existeTurno) {
            return res.status(400).json({
                msg: `El Turno con el DNI = ${idpaciente} ya existe`
            });
        }

        // Creación de instancia en la base de datos.
        const turno = Turno.build({  fechasolicita, idpago, idagenda, idpaciente, idprofesional, idmodalidad, idobrasocial });

      //  const salt = await bcryptjs.genSalt();
       // turno.contrasena = bcryptjs.hashSync(contrasena, salt);

        await turno.save();

        res.json({
            msg:'Turno dado de alta',
            turno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el Turno.'
        });
    }
}

export const putTurno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { contrasena } = req.body;

    try {
        const turno = await Turno.findByPk(id);
        if (!turno) {
            return res.status(404).json({
                msg: `No existe un Turno con el DNI = ${id}`
            });
        }

        await turno.update({contrasena});

        res.json({
            msg:'Turno actualizado con éxito.',
            Turno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar el Turno.'
        });
    }
}

export const deleteTurno = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const turno = await Turno.findByPk(id);
        if (!Turno) {
            return res.status(404).json({
                msg: `No existe un Turno con el DNI = ${id}`
            });
        }

        await Turno.destroy();

        res.json({
            msg: 'El turno fué eliminado con éxito.',
            Turno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar el Turno.'
        });
    }
}