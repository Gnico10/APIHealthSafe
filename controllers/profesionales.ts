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

        // let flag = false;
        // await profesional_especialidades.foreach(async(especialidad : any) => {
        //     let existeespecialidad = await Especialidad.findByPk(especialidad.idespecialidad);
        //     let existecolegiomedico = await ColegioMedico.findByPk(especialidad.idcolegiomedico);

        //     if (!existeespecialidad || !existecolegiomedico) {
        //         flag = true;
        //         return;
        //     }
        // });

        // console.log(flag)
        // if (flag) {
        //     return res.status(400).json({
        //         msg: 'Especialidad o Colegio médico no encontrado en la DB.'
        //     }); 
        // }

        // DB
        let profesional = await Profesional.create({idusuario});

        profesional_matriculas.map(async (matriculas: any) => {
            let matriculaprofesional = await MatriculaProfesional.create({
                numero : matriculas.numero,
                idtipomatricula : matriculas.idtipomatricula,
                iduniversidad : matriculas.iduniversidad
            });

            await Profesionales_MatriculasProfesionales.create({
                titulogrado : matriculas.titulogrado,
                aniootorgamiento : matriculas.aniootorgamiento,
                idmatriculaprofesiona : matriculaprofesional.idmatriculaprofesional,
                idprofesional : profesional.idprofesional
            });
        });

        profesional_especialidades.map(async (especialidad: any) => {
            await Profesionales_Especialidades.create({
                idcolegiomedico : especialidad.idcolegiomedico,
                idespecialidad : especialidad.idespecialidad,
                aniootorgamiento : especialidad.aniootorgamiento,
                idprofesional : profesional.idprofesional
            });
        });

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
                    },
                },
                {
                    model: MatriculaProfesional,
                    as: 'PM_matriculas_profesionales'
                }
                // {
                //     model: Profesionales_Especialidades,
                //     as: 'Especialidades',
                //     include: [{
                //         model: Especialidad,
                //         as: 'Especialidad'
                //     }]
                // }
            ],
            logging: console.log,
        });

        // TODO: Find new profesional with all associations and return them
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