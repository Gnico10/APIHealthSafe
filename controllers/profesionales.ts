import {Request, Response} from 'express';
import { Op } from 'sequelize';
import Profesional from '../models/profesional';
import Profesional_Consultorios from '../models/profesionales_consultorios';
import Consultorios from '../models/consultorio';
import Direcciones from '../models/direccion';
import Localidades from '../models/localidad';
import Profesional_Especialidades from '../models/prefesionales_especialidades';
import Profesional_obrassociales from '../models/profesionales_obrassociales';
import Agenda from '../models/agenda';
import IProfesional from '../interfaces/iProfesional';
import Especialidad from '../models/especialidad';

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
    // variables para filtrar
    let where : any = {};
    let include : any = [];
    let whereInclude : any = {};

    const { nombre, 
            apellido,
            preciodesde,
            preciohasta,
            // Campos foraneos
            idmodalidad,
            idobrasocial,
            codpostal, 
            idespecialidad } = req.query;

    // Validaciones
        // Validar preciodesde menor que preciohasta
    if (preciodesde && preciohasta) {
        if (parseFloat(preciodesde as string) > parseFloat(preciohasta as string)){
            return res.status(404).json({
                msg: 'El precio desde debe ser menor que el precio hasta'
            });
        }
    }

        // Validar que exista la obra social
    if (idobrasocial) {
        const obrasocial = await Profesional_obrassociales.findOne({
            where: {
                idobrasocial: idobrasocial
            }
        });
        if (!obrasocial) {
            return res.status(404).json({
                msg: 'La obra social seleccionada no existe'
            });
        }
    }

        // Validar que exista la localidad
    // if (codpostal) {
    //     const direccion = await Direcciones.findOne({
    //         where: {
    //             codpostal: codpostal
    //         }
    //     })
    //     if (!direccion) {   
    //         return res.status(404).json({
    //             msg: 'El código postal seleccionado no existe'
    //         });
    //     }
    // }

        // Validar que exista la especialidad
    // if (idespecialidad) {
    //     const especialidad = await Profesional_Especialidades.findOne({
    //         where: {
    //             idespecialidad: idespecialidad
    //         }
    //     });
    //     if (!especialidad) {
    //         return res.status(404).json({
    //             msg: 'La especialidad seleccionada no existe'
    //         });
    //     }
    // }

    // Filtros por parametro
    nombre ? where.nombre = { [Op.like]: `%${nombre}%` } : null;
    apellido? where.apellido = { [Op.like]: `%${apellido}%` } : null;
    (preciodesde && preciohasta)? where.precio = { [Op.between]: [preciodesde, preciohasta] } : null; // BETWEEN preciodesde ANDpreciohasta
    (preciodesde && !preciohasta)? where.precio = { [Op.gte]: preciodesde } : null; // >= preciodesde
    (preciohasta && !preciodesde)? where.precio = { [Op.lte]: preciohasta } : null;// <= preciohasta
    
    // console.log(nombre, apellido, preciodesde, preciohasta, idmodalidad, idobrasocial);
    
    // Buscar idmodalidad
    if (idmodalidad) {
        include.push({
            model: Profesional_Especialidades,
            as: 'especialidades',
            where: {
                idespecialidad: idmodalidad
            },
            required: true
        });
    }

    // Buscar obrasocial
    if (idobrasocial) {
        include.push({
            model: Profesional_obrassociales,
            as: 'obrassociales',
            where: {
                idobrasocial: idobrasocial
            },
            required: true
        });
    }

    // Buscar localidad del la direccion del consultorio del profesional
    if(codpostal){
        include.push({
            model: Profesional_Consultorios,
            as: 'consultorios',
            include: [{
                model: Consultorios,
                as: 'consultorio',
                include: [{
                    model: Direcciones,
                    as: 'direccion',
                    include: [{
                        model: Localidades,
                        as: 'localidad',
                        where: {
                            codpostal: codpostal
                        },
                        required: true
                    }],
                    required: true
                }],
                required: true
            }],
            required: true
        });
    }

    idespecialidad ? whereInclude.especialidad = { idespecialidad: idespecialidad } : null
    // Buscar especialidad del profesional
    if (idespecialidad) {
        include.push({
            model: Profesional_Especialidades,
            as: 'especialidades',
            where: {
                idespecialidad: idespecialidad
            },
            required: true
        });
    }

    // Buscar profesionales
    const profesionales = await Profesional.findAll({
        /*where: {
            '$especialidades.idespecialidad$': idespecialidad
        },*/
        where: where,
        include: [
            {
                model: Especialidad,
                through: {
                    attributes: []
                },
                as: 'especialidades',
                where: whereInclude.especialidad
            }
        ]
    });
    let aux = []
    for (const e of profesionales) {
        aux.push(agregarCampos(e))
    }
    res.json({"profesionales": aux});
}

export const getProfesional = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {   
        const profesional = await Profesional.findOne({
            where: {
                idprofesional: id
            },
            include : [
                {
                    model: Especialidad,
                    through: { attributes: [] },
                    as: 'especialidades'
                }
                //TODO Agregar demas includes
                /*{
                    model: Profesional_Consultorios,
                    as: 'consultorios',
                    include: [{
                        model: Consultorios,
                        as: 'consultorio',
                        include: [{
                            model: Direcciones,
                            as: 'direccion',
                            include: [{
                                model: Localidades,
                                as: 'localidad',
                                required: true
                            }],
                            required: true
                        }],
                        required: true
                    }],
                    required: true
                },
                {
                    model: Profesional_obrassociales,
                    as: 'obrassociales',
                    required: true
                }*/
            ]
        })
        
        if (profesional){
            let aux = agregarCampos(profesional)
            res.json(aux);
        } else { 
            res.status(404).json({
                msg: `No existe un Profesional con ID = ${id}`
            });
        }
    
    } catch(e) {
        console.log(e);
        res.json(500)
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