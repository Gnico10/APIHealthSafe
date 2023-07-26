import {Request, Response} from 'express';
import { Op } from 'sequelize';
import { generarJWT } from '../helpers/generarJWT'

import Profesional from '../models/profesional';
import Especialidad from '../models/especialidad';

import Rol from '../models/rol';
import Usuario from '../models/usuario';
import MatriculaProfesional from '../models/matriculaprofesional';
import Profesionales_Especialidades from '../models/profesionales_especialidades';
import ColegioMedico from '../models/colegiomedico';
import Consultorio from '../models/consultorio';
import Direccion from '../models/direccion';
import Agenda from '../models/agenda';
import Modalidad from '../models/modalidad';
import TipoMatricula from '../models/tipomatricula';
import Pais from '../models/pais';
import Universidad from '../models/universidad';
import TituloGrado from '../models/titulogrado';
  
async function profesionalData(idprofesional: any){
    const profesional = await Profesional.findByPk(
        idprofesional, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
            {
                model: Usuario,
                as: 'usuario',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: Especialidad,
                as: 'PE_especialidades',
                through: {
                    attributes: ['aniootorgamiento']
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ],
        }
    );

    if (!profesional) {
        console.log('Profesional no encontrado');
        return;
    }

    // Buscar las matriculas del profesional
    const matriculaprofesional = await MatriculaProfesional.findAll({
        where: { idprofesional: profesional.idprofesional },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
        {
            model: TipoMatricula,
            as: 'tipomatricula',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
            model: Universidad,
            as: 'universidad',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
            {
                model: Pais,
                as: 'pais',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
            ]
        },
        {
            model: TituloGrado,
            as: 'titulogrado',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
        ]
    });

    return {
        ...profesional.toJSON(),
        matriculas_profesional: matriculaprofesional
    };
}


export const getProfesionales = async (req: Request, res: Response) => {
    const { idespecialidad, codpostal, idmodalidad } = req.query;
 
    try {
        let idProfesionalesList: number[] = [];

        // Validaciones
        if (idespecialidad != null) {
            // Buscamos la especialidad
            let especialidad = await Especialidad.findByPk(Number(idespecialidad));
            if (!especialidad){
                return res.status(404).json({
                    msg: `La especialidad con id ${idespecialidad} no existe`
                });
            }
            
            // Buscamos los profesionales con esa especialidad y agregamos a la lista.
            let profesionales_especialidades = await Profesionales_Especialidades.findAll({
                where:{idespecialidad}
            });
            if (profesionales_especialidades.length == 0){
                return res.status(404).json({
                    msg: `No existen profesionales con la especialidad ${idespecialidad} : ${especialidad?.descripcion}`
                });
            }
            
            let idProfesionalesEspecialidadesList: number[] = [];
            for (let especialidad_item of profesionales_especialidades){
                idProfesionalesEspecialidadesList.push(Number(especialidad_item.idprofesional));
            }

            if (idProfesionalesList.length == 0) {
                idProfesionalesList = idProfesionalesEspecialidadesList;
            } else {
                idProfesionalesList = idProfesionalesList
                    .filter(item => idProfesionalesEspecialidadesList.includes(item));
            }
        }

        if (codpostal != null) {
            // Buscamos los consultorios con dicho codigo postal en dirección.
            let consultorios = await Consultorio.findAll({
                include: [
                    {
                        model: Direccion,
                        as: 'direccion',
                        where: {codpostal}
                    }
                ]
            });
            if (consultorios.length == 0){
                return res.status(404).json({
                    msg: `No existen profesionales con consultorios médicos con código postal ${codpostal}`
                });
            }
            
            // Agregamos los profesionales de los consultorios a la lista.
            let idProfesionalesConsultoriosList: number[] = [];
            for (let consultorio_item of consultorios){
                idProfesionalesConsultoriosList.push(Number(consultorio_item.idprofesional));
            }

            if (idProfesionalesList.length == 0) {
                idProfesionalesList = idProfesionalesConsultoriosList;
            } else {
                idProfesionalesList = idProfesionalesList
                    .filter(item => idProfesionalesConsultoriosList.includes(item));
            }
        }

        if (idmodalidad != null) {
            let modalidad = await Modalidad.findByPk(Number(idmodalidad));
            if (!modalidad){
                return res.status(404).json({
                    msg: `La modalidad con id ${idmodalidad} no existe`
                });
            }

            // Buscamos las agendas que tengan cierta modalidad y que sean posterior a la fecha actual.
            const fechaActual = new Date();
            let agendas = await Agenda.findAll({
                where: {
                    idmodalidad: idmodalidad,
                    fechadesde: {
                        [Op.gt]: fechaActual
                    }
                }
            });
            if (agendas.length == 0){
                return res.status(404).json({
                    msg: `No existen profesionales que atiendan con modalidad ${idmodalidad} : ${modalidad?.descripcion}`
                });
            }
            
            // Agregar los idprofesionales de las agendas a la lista.
            let idProfesionalesModalidadsList: number[] = [];
            for (let agenda_item of agendas){
                idProfesionalesModalidadsList.push(Number(agenda_item.idprofesional));
            }

            if (idProfesionalesList.length == 0) {
                idProfesionalesList = idProfesionalesModalidadsList;
            } else {
                idProfesionalesList = idProfesionalesList
                    .filter(item => idProfesionalesModalidadsList.includes(item));
            }
        }

        const profesionales = [];
        for (let idprofesional of idProfesionalesList){
            const profesional = await profesionalData(idprofesional);
            profesionales.push(profesional);
        }

        res.json({
            profesionales
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo consultar los profesionales'
        });
    }
}

export const getProfesional = async (req: Request, res: Response) => {
    const { idprofesional } = req.params;
  
    try {
        const profesional = await profesionalData(idprofesional);
    
        if (! profesional) {
            res.status(404).json({
                msg: `No existe un profesional con id = ${idprofesional}`
            });
        }

        res.json(profesional);
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
  };
  
  


export const postProfesional = async (req: Request, res: Response) => {
    const {
        idusuario,
        descripcion,
        profesional_matriculas, 
        profesional_especialidades
    } = req.body;

    try {
        // Validaciones
        const existeProfesional = await Profesional.findOne({
            where: {idusuario}
        });
    
        if (existeProfesional) {
            return res.status(400).json({
                msg: 'El Profesional ya existe'
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
                msg: 'El usuario seleccionado no es un Profesional'
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
        let profesionalDB = await Profesional.create({idusuario, descripcion});

        for (const matriculas of profesional_matriculas){
            await MatriculaProfesional.create({
                numero : matriculas.numero,
                idtipomatricula : matriculas.idtipomatricula,
                iduniversidad : matriculas.iduniversidad,
                idtitulogrado : matriculas.idtitulogrado,
                aniootorgamiento : matriculas.aniootorgamiento,
                idprofesional : profesionalDB.idprofesional
            });
        }

        for (const especialidad of profesional_especialidades){
            await Profesionales_Especialidades.create({
                idcolegiomedico : especialidad.idcolegiomedico,
                idespecialidad : especialidad.idespecialidad,
                aniootorgamiento : especialidad.aniootorgamiento,
                idprofesional : profesionalDB.idprofesional
            });
        }
        
        const profesional = await profesionalData(profesionalDB.idprofesional)
        const token = await generarJWT(idusuario);
        res.json({
            msg:'Profesional dado de alta',
            profesional,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el profesional'
        });
    }
}
