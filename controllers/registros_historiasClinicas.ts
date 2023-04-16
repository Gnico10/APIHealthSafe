import {Request, Response} from 'express';

import RegistroHistoriaClinica from '../models/registroHistoriaClinica';
import Diagnostico from '../models/diagnostico';
import Paciente from '../models/paciente';
import Medicamento from '../models/medicamento';
import IndicacionGeneral from '../models/indicacionGeneral';
import IndicacionMedicamento from '../models/indicacionMedicamento';

export const getRegistrosHistoriaClinica = async (req: Request, res: Response) => {
    try {
      const registrosHistoriaClinica = await RegistroHistoriaClinica.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Diagnostico,
            as: 'diagnosticos',
            include: [
              {
                model: Medicamento,
                as: 'medicamentos',
                include: [
                  {
                    model: IndicacionMedicamento,
                    as: 'indicacion',
                  },
                ],
              },
              {
                model: IndicacionGeneral,
                as: 'indicacionesGenerales',
              },
            ],
          },
        ],
      });
  
      if (registrosHistoriaClinica.length === 0) {
        return res.status(400).json({
          msg: 'No hay registros de historia clínica en la base de datos',
        });
      }
      res.json({
        registrosHistoriaClinica,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error interno. No se pudo consultar los registros de historia clínica',
      });
    }
};

export const getRegistroHistoriaClinica = async (req: Request, res: Response) => {
    try {
      const registrosHistoriaClinica = await RegistroHistoriaClinica.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
  
      if (registrosHistoriaClinica.length === 0) {
        return res.status(400).json({
          msg: 'No hay registros de historia clínica en la base de datos',
        });
      }
      res.json({
        registrosHistoriaClinica,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error interno. No se pudo consultar los registros de historia clínica',
      });
    }
  };
  

  export const postRegistroHistoriaClinica = async (req: Request, res: Response) => {
    const { idPaciente, fechahora, diagnostico } = req.body;
  
    try {
      // Validar que el paciente exista
      const paciente = await Paciente.findByPk(idPaciente);
      if (!paciente) {
        return res.status(404).json({
          msg: `El paciente con id ${idPaciente} no existe`,
        });
      }
  
      // Crear el registro de historia clínica
      const registroHistoriaClinica = await RegistroHistoriaClinica.create(
        { fechaHora: fechahora, idPaciente },
        { fields: ['fechaHora', 'idPaciente'] }
      );
  
      // Si hay diagnósticos en el request, crearlos y vincularlos al registro
      if (diagnostico && diagnostico.length > 0) {
        const diagnosticosCreados = await Promise.all(
          diagnostico.map(async (diag: any) => {
            const nuevoDiagnostico = await Diagnostico.create(
              { nombre: diag.nombre, descripcion: diag.descripcion, idRegistroHistoriaClinica: registroHistoriaClinica.idRegistroHistoriaClinica },
              { fields: ['nombre', 'descripcion', 'idRegistroHistoriaClinica'] }
            );
  
            // Si hay medicamentos en el diagnóstico, crearlos y vincularlos al diagnóstico
            if (diag.medicamentos && diag.medicamentos.length > 0) {
              const medicamentosCreados = await Promise.all(
                diag.medicamentos.map(async (med: any) => {
                  try {
                    // Crear el medicamento
                    const nuevoMedicamento = await Medicamento.create(
                      { nombre: med.nombre, idDiagnostico: nuevoDiagnostico.idDiagnostico },
                      { fields: ['nombre', 'idDiagnostico'] }
                    );
  
                    // Crear la indicación y vincularla al medicamento
                    const nuevaIndicacion = await IndicacionMedicamento.create(
                      { dosis: med.dosis, frecuencia: med.frecuencia, idMedicamento: nuevoMedicamento.idMedicamento },
                      { fields: ['dosis', 'frecuencia', 'idMedicamento'] }
                    );
  
                    // Vincular la indicación y el medicamento al diagnóstico
                    if (nuevoMedicamento) {
                      await nuevoMedicamento?.setIndicacion(nuevaIndicacion);
                      await nuevoDiagnostico.addMedicamento(nuevoMedicamento);
                    }
  
                    return nuevoMedicamento;
                  } catch (error) {
                    console.log('Error al crear el medicamento:', error);
                    return null;
                  }
                })
              );
  
              // Vincular los medicamentos al diagnóstico
              const medicamentosValidos = medicamentosCreados.filter((med: any) => med !== null);
              await nuevoDiagnostico.addMedicamento(medicamentosValidos);
            }
  
            // Si hay indicaciones generales en el diagnóstico, crearlas y vincularlas al diagnóstico
            if (diag.indicacionesGenerales && diag.indicacionesGenerales.length > 0) {
              const indicacionesCreadas = await Promise.all(
                diag.indicacionesGenerales.map(async (ind: any) => {
                  const nuevaIndicacion = await IndicacionMedicamento.create(
                    { dosis: ind.dosis
  
  
  , frecuencia: ind.frecuencia, idDiagnostico: nuevoDiagnostico.idDiagnostico },
                    { fields: ['dosis', 'frecuencia', 'idDiagnostico'] }
  
                            );
                            return nuevaIndicacion;
                        })
                    );
                    nuevoDiagnostico.set(indicacionesCreadas);
                }

                return nuevoDiagnostico;
            })
        );
        registroHistoriaClinica.set(diagnosticosCreados);

        
    }
      
      res.json({
        msg: 'Registro de historia clínica creado correctamente',
        registroHistoriaClinica,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error interno. No se pudo crear el registro de historia clínica',
      });
    }
  };

  