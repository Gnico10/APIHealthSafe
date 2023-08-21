import {Request, Response} from 'express';
import { profesionalData } from './profesionales';
import { include_turno } from './turnos';

import RegistroHistoriaClinica from '../models/registrohistoriaclinica';
import Diagnostico from '../models/diagnostico';
import Paciente from '../models/paciente';
import Medicamento from '../models/medicamento';
import IndicacionGeneral from '../models/indicaciongeneral';
import IndicacionMedicamento from '../models/indicacionmedicamento';
import Turno from '../models/turno';
import Profesional from '../models/profesional';
import Tipoindicaciongeneral from '../models/tipoindicaciongeneral';
import sequelize from '../db/connection';
import Usuario from '../models/usuario';
import Rol from '../models/rol';

async function registroHistoriaClinicaData(idregistrohistoriaclinica: any){
    const registrohistoriaclinica = await RegistroHistoriaClinica.findByPk(
        idregistrohistoriaclinica,{
            include: [
                {
                    model: Turno,
                    as: 'turno',
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: include_turno
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
                }
            ]
        }
    );

    if (!registrohistoriaclinica) {
        console.log('Registro de historia clínica no encontrado');
        return;
    }

    const diagnosticosData = [];

    // Buscar los diagnósticos relacionados con el registro de historia clínica
    const diagnosticos = await Diagnostico.findAll({
        where: { idregistrohistoriaclinica: registrohistoriaclinica.idregistrohistoriaclinica },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    for (let diagnostico of diagnosticos) {
        // Buscar las indicaciones relacionados con el diagnóstico
        const indicacionmedicamento = await IndicacionMedicamento.findAll({
            where: { iddiagnostico: diagnostico.iddiagnostico },
            include: [{
                model: Medicamento,
                as: 'medicamento',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        // Buscar las indicaciones generales relacionadas con el diagnóstico
        const indicacionesgenerales = await IndicacionGeneral.findAll({
            where: { iddiagnostico: diagnostico.iddiagnostico },
            include: [{
                model: Tipoindicaciongeneral,
                as: 'tipoindicaciongeneral',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        // Agregar los datos del diagnóstico y sus relaciones al objeto JSON
        const datosDiagnostico = {
            ...diagnostico.toJSON(),
            indicacionmedicamento,
            indicacionesgenerales
        };

        diagnosticosData.push(datosDiagnostico);
    }

    const profesional = await profesionalData(registrohistoriaclinica.idprofesional)

    return {
        ...registrohistoriaclinica.toJSON(),
        diagnosticos: diagnosticosData,
        profesional
    }
}

export const getRegistrosHistoriaClinica = async (req: Request, res: Response) => {
    try {
        let historiasclinicas : any[] = [];
        const registrosHistoriaClinicaDB = await RegistroHistoriaClinica.findAll();

        for (let registro of registrosHistoriaClinicaDB){
            const datosRegistro = await registroHistoriaClinicaData(registro.idregistrohistoriaclinica);
            historiasclinicas.push(datosRegistro);
        }

        res.json({
            historiasclinicas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno. No se pudo consultar los registros de historia clínica',
        });
    }
};

export const getRegistroHistoriaClinica_Turno = async (req: Request, res: Response) => {
    const {idturno} = req.params;

    try {
        let historiasclinicas : any[] = [];
        const registrosHistoriaClinicaDB = await RegistroHistoriaClinica.findAll({
            where: { idturno }
        });

    for (let registro of registrosHistoriaClinicaDB){
        const datosRegistro = await registroHistoriaClinicaData(registro.idregistrohistoriaclinica);
        historiasclinicas.push(datosRegistro);
    }

    res.json({
        historiasclinicas
    });

    } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Error interno. No se pudo consultar los registros de historia clínica',
    });
    }
}


export const getRegistrosHistoriaClinica_Paciente = async (req: Request, res: Response) => {
    const { idpaciente } = req.params;

    try {
        let historiasclinicas : any[] = [];
        const registrosHistoriaClinicaDB = await RegistroHistoriaClinica.findAll({
            where: { idpaciente: idpaciente }
        });

    for (let registro of registrosHistoriaClinicaDB){
        const datosRegistro = await registroHistoriaClinicaData(registro.idregistrohistoriaclinica);
        historiasclinicas.push(datosRegistro);
    }

    res.json({
        historiasclinicas
    });
    } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Error interno. No se pudo consultar los registros de historia clínica',
    });
    }
};

export const postRegistroHistoriaClinica = async (req: Request, res: Response) => {
    const { idpaciente, idturno, idprofesional, diagnosticos } = req.body;

    try {
        //Validar que haya diagnosticos
        if (diagnosticos.length === 0) {
            return res.status(404).json({
            msg: `No hay diagnosticos cargados para dar de alta este Registro de Historia Clinica`,
            });
        }

        // Validar que el paciente exista
        const paciente = await Paciente.findByPk(idpaciente);
        if (!paciente) {
            return res.status(404).json({
            msg: `El paciente con id ${idpaciente} no existe`,
            });
        }

        // Validar que el profesional exista
        const profesional = await Profesional.findByPk(idprofesional);
        if (!profesional) {
            return res.status(404).json({
            msg: `El profesional con id ${idprofesional} no existe`,
            });
        }

        //Validar turno
        const turno = await Turno.findByPk(idturno);
        if (!turno) {
            return res.status(404).json({
            msg: `El turno con id ${idturno} no existe`,
            });
        }

        if (turno.idpaciente !== paciente.idpaciente) {
            return res.status(404).json({
            msg: `El turno con id ${turno.idturno} no pertenece al paciente con id ${paciente.idpaciente}`,
            });
        }

        // Iniciar la transacción para asegurar la creación segura de todos los modelos
        const t = await sequelize.transaction();

        try {
            // Crear el registro de historia clínica
            const registroHistoriaClinica = await RegistroHistoriaClinica.create(
                {
                    idpaciente,
                    idturno,
                    idprofesional,
                },
                { transaction: t }
            );

            // Si hay diagnósticos en el request, crearlos y vincularlos al registro
            for (let diagnostico of diagnosticos) {
                // Crear diagnóstico
                const newDiagnostico = await Diagnostico.create(
                    {
                        nombre: diagnostico.nombre,
                        descripcion: diagnostico.descripcion,
                        idregistrohistoriaclinica: registroHistoriaClinica.idregistrohistoriaclinica,
                    },
                    { transaction: t }
                );

                // Crear indicaciones medicamentos
                for (let indicacionmedicamento of diagnostico.indicacionesmedicamentos) {
                    const newIndicacionMedicamento = await IndicacionMedicamento.create(
                    {
                        dosis: indicacionmedicamento.dosis,
                        cantidad:indicacionmedicamento.cantidad,
                        periodicidad: indicacionmedicamento.periodicidad,
                        duraciontratamiento: indicacionmedicamento.duraciontratamiento,
                        observaciones: indicacionmedicamento.observaciones,
                        idmedicamento: indicacionmedicamento.idmedicamento,
                        iddiagnostico: newDiagnostico.iddiagnostico,
                    },
                    { transaction: t }
                    );
                }

                // Crear indicaciones generales
                for (let indicaciongeneral of diagnostico.indicacionesgenerales) {
                    const tipoIndicacionGeneral = await Tipoindicaciongeneral.findByPk(
                        indicaciongeneral.idtipoindicaciongeneral);
                    if (!tipoIndicacionGeneral) {
                        // Si no se encuentra el tipo de indicación general, se puede manejar el error según sea necesario
                        // En este caso, se hará un rollback de la transacción y se enviará una respuesta de error
                        await t.rollback();
                        return res.status(404).json({
                            msg: `El tipo de indicación general con id 
                                ${indicaciongeneral.idtipoindicaciongeneral} no existe`,
                        });
                    }

                    await IndicacionGeneral.create(
                        {
                            detalle: indicaciongeneral.detalle,
                            idtipoindicaciongeneral: indicaciongeneral.idtipoindicaciongeneral,
                            iddiagnostico: newDiagnostico.iddiagnostico,
                        },
                        { transaction: t }
                    );
                }
            }

            // Commit de la transacción, es decir, confirmar los cambios en la base de datos
            await t.commit();

            // Obtener los datos completos después de la transacción exitosa
            const datos = await registroHistoriaClinicaData(
                registroHistoriaClinica.idregistrohistoriaclinica);
            
            res.json({
                msg: 'Registro de historia clínica creado correctamente',
                datos,
            });
        } catch (error) {
            // Si ocurre algún error, hacemos rollback de la transacción para deshacer los cambios
            await t.rollback();
                console.log(error);
                res.status(500).json({
                msg: 'Error interno. No se pudo crear el registro de historia clínica',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno. No se pudo crear el registro de historia clínica',
        });
    }
};


     
   
  