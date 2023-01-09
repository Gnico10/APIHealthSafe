import {Request, Response} from 'express';
import Paciente from '../models/paciente';

import HistoriaClinica from '../models/historiaclinica';
import Usuario from '../models/usuario';
import Rol from '../models/rol';

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
    const {idusuario} = req.body;

    try {
        // Validaciones
        const existepaciente = await Paciente.findOne({
            where: {
                idusuario: idusuario
            }
        });

        if (existepaciente) {
            return res.status(400).json({
                msg: 'El paciente ya existe'
            });
        }

        const usuario = await Usuario.findByPk(idusuario);
        const rol = await Rol.findByPk(usuario?.idrol);
        if ( rol?.descripcion != 'Paciente') {
            return res.status(400).json({
                msg: 'El usuario seleccionado no es un paciente.'
            }); 
        }

        // Creación de instancia en la base de datos.
        const historiaclinica = await HistoriaClinica.create({
            peso: 0,
            edad: 0
        });

        const paciente = Paciente.build({
            idusuario: idusuario,
            idhistoriaclinica: historiaclinica.idhistoriaclinica
        });

        await paciente.save();

        const pacienteDB = await Paciente.findOne({
            where: {
                idusuario: idusuario
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                },
                {
                    model: HistoriaClinica,
                    as: 'historiaclinica'
                }
            ],
        });

        res.json({
            msg:'paciente dado de alta',
            pacienteDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el paciente.'
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