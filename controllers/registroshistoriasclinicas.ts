import {Request, Response} from 'express';

import RegistroHistoriaClinica from '../models/registrohistoriaclinica';
import Diagnostico from '../models/diagnostico';
import Paciente from '../models/paciente';
import Medicamento from '../models/medicamento';
import IndicacionGeneral from '../models/indicaciongeneral';
import IndicacionMedicamento from '../models/indicacionmedicamento';
import indicacionmedicamento from '../models/indicacionmedicamento';

export const getRegistrosHistoriaClinica = async (req: Request, res: Response) => {
    try {
      const registrosHistoriaClinica = await RegistroHistoriaClinica.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        /*
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
                    as: 'indicacionmedicamento',
                  },
                ],
              },
              {
                model: IndicacionGeneral,
                as: 'indicacionesGenerales',
              },
            ],
          },
        ],*/
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
  
    const { idpaciente,
            fechahora,
            diagnostico } = req.body;
  
    try {
      // Validar que el paciente exista
      const paciente = await Paciente.findByPk(idpaciente);
      if (!paciente) {
        return res.status(404).json({
          msg: `El paciente con id ${idpaciente} no existe`,
        });
      }
  
      // Crear el registro de historia clínica
      const registroHistoriaClinica = await RegistroHistoriaClinica.create({fechahora, idpaciente})
  
      // Si hay diagnósticos en el request, crearlos y vincularlos al registro
if (Array.isArray(diagnostico)) {
  const diagnosticoPromises = diagnostico.map(async (diagno_item) => {
    const newDiagnostico = await Diagnostico.create({
      nombre: diagno_item.nombre,
      descripcion: diagno_item.descripcion,
      idregistrohistoriaclinica: registroHistoriaClinica.idregistrohistoriaclinica
    });

    // Si hay medicamentos en el diagnóstico, crearlos y vincularlos al diagnóstico
    if (Array.isArray(diagno_item.medicamentos)) {
      const medicamentoPromises = diagno_item.medicamentos.map(async (medicamento: { nombre: any; monodroga: any; presentacion: any; cantidad: any; idindicacionmedicamento: any; dosis: any; periodicidad: any; duraciontratamiento: any; observaciones: any; }) => {
        let newMedicamento = await Medicamento.create({
          nombre: medicamento.nombre,
          iddiagnostico: newDiagnostico.iddiagnostico,
          monodroga: medicamento.monodroga,
          presentacion: medicamento.presentacion,
          cantidad: medicamento.cantidad,
          idindicacionmedicamento: medicamento.idindicacionmedicamento
        });

        // Crear la indicación y vincularla al medicamento
        await IndicacionMedicamento.create({
          dosis: medicamento.dosis,
          periodicidad: medicamento.periodicidad,
          duraciontratamiento: medicamento.duraciontratamiento,
          observaciones: medicamento.observaciones,
          idmedicamento: newMedicamento.idmedicamento
        });
      });

      await Promise.all(medicamentoPromises);
    }
  });

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
  /*
      if (diagnostico && diagnostico.length > 0) {
              // Vincular los medicamentos al diagnóstico
              const medicamentosValidos = medicamentosCreados.filter((med: any) => med !== null && typeof med === 'object') as iIndicacionMedicamento[];
              for (const medicamento of medicamentosValidos) {
                await nuevoDiagnostico.addMedicamento(medicamento);
              }
              
            }
  
            // Si hay indicaciones generales en el diagnóstico, crearlas y vincularlas al diagnóstico
            if (diag.indicacionesGenerales && diag.indicacionesGenerales.length > 0) {
              const indicacionesCreadas = await Promise.all(
                diag.indicacionesGenerales.map(async (ind: any) => {
                  const nuevaIndicacion = await IndicacionMedicamento.create(
                    { dosis: ind.dosis, frecuencia: ind.frecuencia, idDiagnostico: nuevoDiagnostico.idDiagnostico },
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

  */