import {Request, Response} from 'express';
import Paciente from '../models/paciente';

export const getPacientes = async (req: Request, res: Response) => {
    const pacientes = await Paciente.findAll();
    res.json({pacientes});
}

export const getPaciente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (paciente){
        res.json(paciente);
    } else {
        res.status(404).json({
            msg: `No existe un paciente con dni = ${id}`
        });
    }
}

export const postPaciente = async (req: Request, res: Response) => {
    const { idpaciente,
            idobrasocial,
            nombre,
            apellido,
            email,
            fechanacimiento,
            dni } = req.body;
    
    try {
        // Validaciones
        const existepaciente = await Paciente.findOne({
            where: {dni}
        });

        if (existepaciente) {
            return res.status(400).json({
                msg: `El paciente con el DNI = ${dni} ya existe`
            });
        }

        // Creación de instancia en la base de datos.
        const paciente = Paciente.build({       idpaciente,
                                                idobrasocial,
                                                nombre,
                                                apellido,
                                                email,
                                                fechanacimiento,
                                                dni });

        await paciente.save();

        res.json({
            msg:'paciente dado de alta',
            paciente
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el paciente.'
        });
    }
}

export const putPaciente = async (req: Request, res: Response) => {
    const { idpaciente } = req.params;
    const { idobrasocial,
            nombre,
            apellido,
            email,
            fechanacimiento,
            dni } = req.body;

    try {
        const paciente = await Paciente.findByPk(idpaciente);
        if (!paciente) {
            return res.status(404).json({
                msg: `No existe un paciente con el ID = ${idpaciente}`
            });
        }

        await paciente?.update({    idobrasocial,
                                    nombre,
                                    apellido,
                                    email,
                                    fechanacimiento,
                                    dni});

        res.json({
            msg:'paciente actualizado con éxito.',
            paciente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar el paciente.'
        });
    }
}

export const deletePaciente = async (req: Request, res: Response) => {
    const { idpaciente } = req.params;

    try {
        const paciente = await Paciente.findByPk(idpaciente);
        if (!paciente) {
            return res.status(404).json({
                msg: `No existe un paciente con el ID = ${idpaciente}`
            });
        }

        await paciente.destroy();

        res.json({
            msg: 'El paciente fué eliminado con éxito.',
            paciente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Eliminar el paciente.'
        });
    }
}