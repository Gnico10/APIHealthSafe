import {Request, Response} from 'express';

import RegistroHistoriaClinica from '../models/registrohistoriaclinica';
import Diagnostico from '../models/diagnostico';
import Paciente from '../models/paciente';
import Medicamento from '../models/medicamento';
import IndicacionGeneral from '../models/indicaciongeneral';
import IndicacionMedicamento from '../models/indicacionmedicamento';

// Definir tipos de datos
interface Datos {
  registroHistoriaClinica: any;
  diagnosticos: {
    diagnostico: any;
    medicamentos: any[];
    indicacionesGenerales: any[];
  }[];
}

async function registroHistoriaClinicaData(idregistrohistoriaclinica: any){
  const registroHistoriaClinicaDB = await RegistroHistoriaClinica.findByPk(
    idregistrohistoriaclinica,{
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  );

  if (!registroHistoriaClinicaDB) {
    console.log('Registro de historia clínica no encontrado');
    return;
  }

  // Buscar los diagnósticos relacionados con el registro de historia clínica
  const diagnosticos = await Diagnostico.findAll({
    where: { idregistrohistoriaclinica: registroHistoriaClinicaDB.idregistrohistoriaclinica },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  
  // Construir el objeto JSON con todos los datos
  const datos: Datos = {
    registroHistoriaClinica: registroHistoriaClinicaDB,
    diagnosticos: [],
  };

  for (let diagnostico of diagnosticos) {
    // Buscar los medicamentos relacionados con el diagnóstico
    const medicamentos = await Medicamento.findAll({
      where: { iddiagnostico: diagnostico.iddiagnostico },
      include: [
        {
          model: IndicacionMedicamento,
          as: 'indicacionmedicamento',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    // Buscar las indicaciones generales relacionadas con el diagnóstico
    const indicacionesGenerales = await IndicacionGeneral.findAll({
      where: { iddiagnostico: diagnostico.iddiagnostico },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    // Agregar los datos del diagnóstico y sus relaciones al objeto JSON
    const datosDiagnostico = {
      diagnostico: diagnostico,
      medicamentos: medicamentos,
      indicacionesGenerales: indicacionesGenerales
    };

    datos.diagnosticos.push(datosDiagnostico);
  }

  return datos
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


export const getRegistrosHistoriaClinicaPorPaciente = async (req: Request, res: Response) => {
  const { idpaciente } = req.params;

  try {
    let historiasclinicas : any[] = [];
    const registrosHistoriaClinicaDB = await RegistroHistoriaClinica.findAll({
      where: { idpaciente: idpaciente }
    });

    if (registrosHistoriaClinicaDB.length == 0) {
      return res.status(400).json({
        msg: `No hay registros de historia clínica para el paciente con id ${idpaciente}`,
      });
    }

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
    const { idpaciente,
            fechahora,
            diagnosticos } = req.body;
  
    try {
      //Validar que haya diagnosticos
      if (diagnosticos.length == 0){
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
  
      // Crear el registro de historia clínica
      const registroHistoriaClinica = await RegistroHistoriaClinica.create({fechahora, idpaciente});
      
      // Si hay diagnósticos en el request, crearlos y vincularlos al registro
      for (let diagnostico of diagnosticos){
        // Crear diagnostico
        const newDiagnostico = await Diagnostico.create({
          nombre: diagnostico.nombre,
          descripcion: diagnostico.descripcion,
          idregistrohistoriaclinica: registroHistoriaClinica.idregistrohistoriaclinica
        });
        
        // Crear Indicaciciones Medicamentos
        for (let medicamento of diagnostico.medicamentos){
          const newIndicacionMedicamento = await IndicacionMedicamento.create({
            dosis: medicamento.dosis,
            periodicidad: medicamento.periodicidad,
            duraciontratamiento: medicamento.duraciontratamiento,
            observaciones: medicamento.observaciones
          });

          // Crear Medicamento
          await Medicamento.create({
            nombre: medicamento.nombre,
            monodroga: medicamento.monodroga,
            presentacion: medicamento.presentacion,
            cantidad: medicamento.cantidad,
            iddiagnostico: newDiagnostico.iddiagnostico,
            idindicacionmedicamento: newIndicacionMedicamento.idindicacionmedicamento
          });
        }

        // Crear Indicaciones Generales
        for (let indicacionGeneral of diagnostico.indicacionesgenerales){
          await IndicacionGeneral.create({
            tipo: indicacionGeneral.tipo,
            detalle: indicacionGeneral.detalle,
            iddiagnostico: newDiagnostico.iddiagnostico
          });
        }
      }
      
      const datos = await registroHistoriaClinicaData(registroHistoriaClinica.idregistrohistoriaclinica);
      res.json({
        msg: 'Registro de historia clínica creado correctamente',
        datos 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error interno. No se pudo crear el registro de historia clínica',
      });
    }
  };
  
     
   
  