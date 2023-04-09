import {Request, Response} from 'express';

import TipoAntecedente from '../models/tipoantecedente';
import Paciente from '../models/paciente';
import Antecedente from '../models/antecedente';
import Profesional from '../models/profesional';

export const getAntecedentes_Paciente = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const antecedentes_paciente = await Antecedente.findAll({
            where: {
                idPaciente: id 
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: TipoAntecedente,
                    as: 'tipoantecedente',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Paciente,
                    as: 'paciente',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        }); 

        if (antecedentes_paciente.length == 0) {
            return res.status(400).json({
                msg: `El paciente con ID: ${id} no tiene antecedentes cargados`
            });
        }

        res.json({
            antecedentes_paciente
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los antecedentes del paciente'
        });
    }
}

export const postAntecedente = async (req: any, res: Response) => {
    const { idtipoantecedente,
            idPaciente,
            descripcion } = req.body;
    
    try {
        // Validations
        // Validate idtipoantecedente
        const existeTipoAntecedente = await TipoAntecedente.findByPk(idtipoantecedente);
        if (!existeTipoAntecedente) {
            return res.status(400).json({
                msg: `El Tipo Antecedente con ID = ${idtipoantecedente} no existe`
            });
        }

        // Validate idPaciente
        const existePaciente = await Paciente.findByPk(idPaciente);
        if (!existePaciente) {
            return res.status(400).json({
                msg: `El Paciente con el ID = ${idPaciente} no existe`
            });
        }

        // Validar que lo esté tratando de crear un paciente
        const profesional = await Profesional.findOne({
            where: { idusuario: req.idUsuarioToken }
        });
        if (!profesional) {
            return res.status(404).json({
                msg: 'Solamente un usuario Profesional puede crear antecedentes a un paciente.'
            });
        }

        // Create antecedente
        const antecedente = await Antecedente.build({
            idtipoantecedente,
            idPaciente,
            descripcion
        });

        await antecedente.save();
        
        res.json({
            msg: `Antecedente con ID: ${idtipoantecedente} asociado a paciente con ID: ${idPaciente}`,
            antecedente
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se ha podido crear el antecedente'
        });
    }
}