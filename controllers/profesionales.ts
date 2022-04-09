import {Request, Response} from 'express';
import Profesional from '../models/profesional';

export const getProfesionales = async (req: Request, res: Response) => {
    const profesionales = await Profesional.findAll();
    res.json({profesionales});
}

export const getProfesional = async (req: Request, res: Response) => {
    const { id } = req.params;
    const profesional = await Profesional.findByPk(id);

    if (profesional){
        res.json(profesional);
    } else { 
        res.status(404).json({
            msg: `No existe un Profesional con DNI = ${id}`
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
        const existeProfesional = await Profesional.findOne({
            where: {dni}
        });

        if (existeProfesional) {
            return res.status(400).json({
                msg: `El Profesional con el DNI = ${dni} ya existe`
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