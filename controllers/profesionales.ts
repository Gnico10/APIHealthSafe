import {Request, Response} from 'express';
import { Op } from 'sequelize';
import Profesional from '../models/profesional';
import IProfesional from '../interfaces/iProfesional';

//TODO remover una vez implementado
const adicional = {
    "especialidad": "Clinico",
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
    let aux = []
    for (const e of profesionales) {
        aux.push(agregarCampos(e))
    }
    res.json({"profesionales": aux});
}

export const getProfesional = async (req: Request, res: Response) => {
    const { id } = req.params;
    const profesional = await Profesional.findByPk(id);

    if (profesional){
        let aux = agregarCampos(profesional)
        res.json(aux);
    } else { 
        res.status(404).json({
            msg: `No existe un Profesional con ID = ${id}`
        });
    }
}

export const postProfesional = async (req: Request, res: Response) => {
    const { idprofesional,
            matriculanacional,
            matriculaprovincial,
            nombre,
            apellido,
            email,
            fechanacimiento,
            dni } = req.body;
    
    try {
        // Validaciones
        // Validar que el ID no exista
        const existeProfesional = await Profesional.findOne({
            where: {dni}
        });

        if (existeProfesional) {
            return res.status(400).json({
                msg: `El Profesional con el DNI = ${dni} ya existe`
            });
        }

        // Validar que no se repita la matricula
        const existeMatricula = await Profesional.findOne({
            where: {
                [Op.or]: [
                    {matriculanacional},
                    {matriculaprovincial}
                ]
            }
        });

        if (existeMatricula) {
            return res.status(400).json({
                msg: `La matricula nacional ${matriculanacional} o la matricula provincial ${matriculaprovincial} ya existe`
            });
        }


        // Creación de instancia en la base de datos.
        const profesional = Profesional.build({ idprofesional,
                                                matriculanacional,
                                                matriculaprovincial,
                                                nombre,
                                                apellido,
                                                email,
                                                fechanacimiento,
                                                dni });

        await profesional.save();

        res.json({
            msg:'Profesional dado de alta',
            Profesional
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el Profesional.'
        });
    }
}

export const putProfesional = async (req: Request, res: Response) => {
    const { idprofesional } = req.params;
    const { matriculanacional,
            matriculaprovincial,
            nombre,
            apellido,
            email,
            fechanacimiento,
            dni } = req.body; 

    try {
        const profesional = await Profesional.findByPk(idprofesional);
        if (!profesional) {
            return res.status(404).json({
                msg: `No existe un Profesional con el ID = ${idprofesional}`
            });
        }

        await profesional.update({matriculanacional,
                                    matriculaprovincial,
                                    nombre,
                                    apellido,
                                    email,
                                    fechanacimiento,
                                    dni});

        res.json({
            msg:'Profesional actualizado con éxito.',
            profesional
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Actualizar el Profesional.'
        });
    }
}

export const deleteProfesional = async (req: Request, res: Response) => {
    const { idprofesional } = req.params;

    try {
        const profesional = await Profesional.findByPk(idprofesional);
        if (!profesional) {
            return res.status(404).json({
                msg: `No existe un Profesional con el ID = ${idprofesional}`
            });
        }

        await profesional.destroy();

        res.json({
            msg: 'El Profesional fué eliminado con éxito.',
            profesional
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Eliminar el Profesional.'
        });
    }
}