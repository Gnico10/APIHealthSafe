import {Request, Response} from 'express';
import { Op } from 'sequelize';
import sequelize from '../db/connection';
import Profesional from '../models/profesional';
import Profesional_Consultorios from '../models/profesionales_consultorios';
import Consultorios from '../models/consultorio';
import Direcciones from '../models/direccion';
import Localidades from '../models/localidad';
import Profesional_Especialidades from '../models/profesionales_especialidades';
import Profesional_obrassociales from '../models/profesionales_obrassociales';
import Agenda from '../models/agenda';
import IProfesional from '../interfaces/iProfesional';
import Especialidad from '../models/especialidad';
import Modalidad from '../models/modalidad';
import Rol from '../models/rol';
import Usuario from '../models/usuario';
import matriculaprofesional from '../models/matriculaprofesional';

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
    const profesionales = await Profesional.findAll();
    res.json({profesionales});
}

export const postProfesional = async (req: Request, res: Response) => {
    const {
        idusuario,
        profesional_matriculas, 
        profesional_especialidades
    } = req.body;

    const existeProfesional = await Profesional.findOne({
        where: {idusuario: idusuario}
    });

    if (existeProfesional) {
        return res.status(400).json({
            msg: 'El Profesional ya existe'
        });
    }

    const usuario = await Usuario.findByPk(idusuario);
    const rol = await Rol.findByPk(usuario?.idrol);
    if ( rol?.descripcion != 'Profesional') {
        return res.status(400).json({
            msg: 'El usuario seleccionado no es un Profesional.'
        });      
    }
    
    try {
        const transaction = await sequelize.transaction();
        console.log(profesional_matriculas);
        console.log(profesional_especialidades);
        // Creación de instancia en la base de datos.
        // const profesional = await Profesional.create({
        //     idusuario: idusuario
        // });


        profesional_matriculas.map(async (matriculas: any) => {
            await matriculaprofesional.build();
            // await rol.build({
            //     descripcion: desc
            // });
        });

        // const profesionalDB = await Profesional.findOne({
        //     where: {
        //         idusuario: idusuario
        //     },
        //     include: [{
        //         model: Usuario,
        //         as: 'usuario'
        //     }],
        // });

        // res.json({
        //     msg:'Profesional dado de alta',
        //     profesionalDB
        // });
        transaction.commit();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el profesional.'
        });
    }
}