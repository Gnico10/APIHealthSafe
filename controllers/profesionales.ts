import {Request, Response} from 'express';

import Profesional from '../models/profesional';
import Direccion from '../models/direccion';
import IProfesional from '../interfaces/iProfesional';
import Especialidad from '../models/especialidad';

import Rol from '../models/rol';
import Usuario from '../models/usuario';
import MatriculaProfesional from '../models/matriculaprofesional';
import Profesionales_MatriculasProfesionales from '../models/profesionales_matriculasprofesionales';
import Profesionales_Especialidades from '../models/profesionales_especialidades';
import ColegioMedico from '../models/colegiomedico';


//TODO remover una vez implementado
const adicional = {
    "calificacion": "5.0",
    "localidad": "San Miguel de Tucumán",
    "centrosAtencion": "Clinica Mayo - 9 de julio 279",
    "modalidadAtencion": "Videollamada",
    "precioConsulta": "5000"
}

//TODO remover una vez implementado
const agregarCampos = (e: IProfesional) => {
    return {...e.toJSON(), ...adicional}
}


export const getProfesionales = async (req: Request, res: Response) => {
   
    const { idespecialidad, codpostal } = req.query;
 

    const profesional = await Profesional.findAll({
        include: [
            {
                model: Especialidad,
                as: 'especialidades',
                where: {
                    idespecialidad: idespecialidad
                } 
            },
            {
                model: Direccion,
                as: 'direcciones',
                where: {
                    codpostal: codpostal
                }
            }
        ]
    });
    
    res.json({
        profesional
    });
}

export const getProfesional = async (req: Request, res: Response) => {

    const { id } = req.params;
 
    const profesional = await Profesional.findOne({
        where: {
            idprofesional: id
        },
        include: [
            {
                model: Usuario,
                as: 'usuario'
            },
            {
                model: MatriculaProfesional,
                as: 'PM_matriculas_profesionales',
                through: {
                    attributes: ['titulogrado', 'aniootorgamiento'],
                }
            },
            {
                model: Especialidad,
                as: 'PE_especialidades',
                through: {
                    attributes: ['idcolegiomedico', 'aniootorgamiento'],
                },
            },
        ],
        logging: console.log,
    });

    if (profesional){
        res.json(profesional);
    } else {
        res.status(404).json({
            msg: `No existe un profesional con id = ${id}`
        });
    }
}


export const postProfesional = async (req: Request, res: Response) => {
    const {
        idusuario,
        profesional_matriculas, 
        profesional_especialidades
    } = req.body;

    try {
        // Validaciones
        const existeProfesional = await Profesional.findOne({
            where: {idusuario: idusuario}
        });
    
        if (existeProfesional) {
            return res.status(400).json({
                msg: 'El Profesional ya existe.'
            });
        }
    
        const usuario : any = await Usuario.findByPk(idusuario, {
            include: [{
                model: Rol,
                as: 'rol'
            }]        
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        
        if (usuario.rol.descripcion != 'Profesional') {
            return res.status(400).json({
                msg: 'El usuario seleccionado no es un Profesional.'
            }); 
        }

        for (let especialidad of profesional_especialidades){
            let existeEspecialidad = await Especialidad.findByPk(especialidad.idespecialidad);
            if (!existeEspecialidad) {
                return res.status(400).json({
                    msg: `La especialidad con id ${especialidad.idespecialidad} no existe`
                });
            }

            let existeColegioMedico = await ColegioMedico.findByPk(especialidad.idcolegiomedico);
            if (!existeColegioMedico) {
                return res.status(400).json({
                    msg: `El Colegio Medico con id ${especialidad.idcolegiomedico} no existe`
                });
            }
        }

        // DB
        let profesional = await Profesional.create({idusuario});
        for (const matriculas of profesional_matriculas){
            let matriculaprofesional = await MatriculaProfesional.create({
                numero : matriculas.numero,
                idtipomatricula : matriculas.idtipomatricula,
                iduniversidad : matriculas.iduniversidad
            });

            await Profesionales_MatriculasProfesionales.create({
                titulogrado : matriculas.titulogrado,
                aniootorgamiento : matriculas.aniootorgamiento,
                idmatriculaprofesional : matriculaprofesional.idmatriculaprofesional,
                idprofesional : profesional.idprofesional
            });
        }

        for (const especialidad of profesional_especialidades){
            await Profesionales_Especialidades.create({
                idcolegiomedico : especialidad.idcolegiomedico,
                idespecialidad : especialidad.idespecialidad,
                aniootorgamiento : especialidad.aniootorgamiento,
                idprofesional : profesional.idprofesional
            });
        }
        
        const profesionalDB = await Profesional.findOne({
            where: {idusuario},
            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                },
                {
                    model: Especialidad,
                    as: 'PE_especialidades',
                    through: {
                        attributes: ['aniootorgamiento']
                    }
                },
                {
                    model: MatriculaProfesional,
                    as: 'PM_matriculas_profesionales',
                    through: {
                        attributes: ['titulogrado', 'aniootorgamiento']
                    }
                }
            ]
        });

        res.json({
            msg:'Profesional dado de alta',
            profesional: profesionalDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el profesional.'
        });
    }
}