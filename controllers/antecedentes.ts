import {Request, Response} from 'express';

import TipoAntecedente from '../models/tipoantecedente';
import Paciente from '../models/paciente';
import Antecedente from '../models/antecedente';
import Profesional from '../models/profesional';
import Usuario from '../models/usuario';
import Rol from '../models/rol';

async function antecedenteData(idantecedente: any){
    const antecedentesDB = await Antecedente.findByPk(
        idantecedente, {
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
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Rol,
                        as: 'rol',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }]
                }]
            },
            {
                model: Profesional,
                as: 'profesional',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Rol,
                        as: 'rol',
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }]
                }]
            }
        ]}
    ); 

    if (!antecedentesDB) {
        console.log('Antecendete no encontrado');
        return;
    }

    return antecedentesDB;
}

export const getAntecedentes_Paciente = async (req: Request, res: Response) => {
    const { idpaciente } = req.params;

    try {
        const antecedentes_paciente = await Antecedente.findAll({where: {idpaciente}}); 
        const antecedentes = [];
        for (let antecedente of antecedentes_paciente){
            const antecedenteDB = await antecedenteData(antecedente.idantecedente);
            antecedentes.push(antecedenteDB);
        }

        res.json({
            antecedentes
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los antecedentes del paciente.'
        });
    }
}

export const postAntecedente = async (req: any, res: Response) => {
    const { descripcion,
            nombre,
            idtipoantecedente,
            idpaciente} = req.body;
        // El idprofeional es obtenido por medio del idUsuarioToken
    
    try {
        // Validations
        // Validate idtipoantecedente
        const existeTipoAntecedente = await TipoAntecedente.findByPk(idtipoantecedente);
        if (!existeTipoAntecedente) {
            return res.status(400).json({
                msg: `El Tipo Antecedente con ID = ${idtipoantecedente} no existe`
            });
        }

        // Validate idpaciente
        const existePaciente = await Paciente.findByPk(idpaciente);
        if (!existePaciente) {
            return res.status(400).json({
                msg: `El Paciente con el ID = ${idpaciente} no existe`
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
        const antecedente = await Antecedente.create({
            descripcion,
            nombre,
            idtipoantecedente,
            idpaciente,
            idprofesional: profesional.idprofesional
        });

        const antecendeDB = await antecedenteData(antecedente.idantecedente);

        res.json({
            msg: `Antecedente dado de alta a paciente con ID: ${idpaciente}`,
            antecedente: antecendeDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se ha podido crear el antecedente'
        });
    }
}