import agenda from "../models/agenda";
import calificacion from "../models/calificacion";
import citamedica from "../models/citamedica";
import citamedicaemergencia from "../models/citamedicaemergencia";
import consultorio from "../models/consultorio";
import dia from "../models/dias";
import direccion from "../models/direccion";
import episodio from "../models/episodio";
import especialidad from "../models/especialidad";
import estadoturno from "../models/estadoturno";
import historiaclinica from "../models/historiaclinica";
import horario from "../models/horario";
import horarios_modalidades from "../models/horarios_modalidades";
import indicacion from "../models/indicacion";
import localidad from "../models/localidad";
import mensaje from "../models/mensaje";
import mensajeria from "../models/mensajeria";
import modalidad from "../models/modalidad";
import obrasocial from "../models/obrasocial";
import paciente from "../models/paciente";
import pago from "../models/pago";
import pedidoemergencia from "../models/pedidoemergencia";
import prescripcion from "../models/prescripcion";
import profesionales_especialidades from "../models/prefesionales_especialidades";
import profesional from "../models/profesional";
import profesionales_consultorios from "../models/profesionales_consultorios";
import profesionales_obrassociales from "../models/profesionales_obrassociales";
import turno from "../models/turno";
import usuario from "../models/usuario";
import sequelize from "./connection";

const sincronizarDB = async() =>  {
    // Sync all models that aren't already in the database
    // await sequelize.sync();

    await usuario.sync();
    await profesional.sync();
    await localidad.sync();
    await direccion.sync();
    await consultorio.sync();
    await profesionales_consultorios.sync();
    await especialidad.sync();
    await profesionales_especialidades.sync();
    await obrasocial.sync();
    await profesionales_obrassociales.sync();
    await paciente.sync();
    await estadoturno.sync();
    await pago.sync();
    await agenda.sync();
    await modalidad.sync();
    await turno.sync();
    await calificacion.sync();
    await dia.sync();
    await horario.sync();
    await horarios_modalidades.sync();
    await citamedica.sync();
    await pedidoemergencia.sync();
    await citamedicaemergencia.sync();
    await prescripcion.sync();
    await indicacion.sync();
    await historiaclinica.sync();
    await episodio.sync();
    await mensajeria.sync();
    await mensaje.sync();

    // Charge Especialidades when the database is empty.
    if (await especialidad.count() === 0) {
        await cargarEspecialidades();
    }
}

const cargarEspecialidades = async() => {
    // List of Especialidades
    const descespe : string[] = ['Médico General', 
                                'Cardiología', 
                                'Dermatología', 
                                'Endocrinología', 
                                'Gastroenterología', 
                                'Ginecología', 
                                'Hematología', 
                                'Infectología', 
                                'Medicina general', 
                                'Neumología', 
                                'Neurología', 
                                'Nutrición', 
                                'Oftalmología', 
                                'Oncología', 
                                'Otorrinolaringología', 
                                'Pediatría', 
                                'Psiquiatría', 
                                'Reumatología', 
                                'Urología'];

    // Create Especialidades in database
    descespe.map(async (desc) => {
        await especialidad.create({
            descripcion: desc
        });
    });
}
    

export default sincronizarDB;