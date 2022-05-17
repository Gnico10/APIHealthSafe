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
import profesionales_especialidades from "../models/profesionales_especialidades";
import profesional from "../models/profesional";
import profesionales_consultorios from "../models/profesionales_consultorios";
import profesionales_obrassociales from "../models/profesionales_obrassociales";
import turno from "../models/turno";
import usuario from "../models/usuario";
import sequelize from "./connection";

const sincronizarDB = async() =>  {
    // Sync all models that aren't already in the database
    // await sequelize.sync();

    await usuario.sync({force: false});
    await profesional.sync({force: false});
    await localidad.sync({force: false});
    await direccion.sync({force: false});
    await consultorio.sync({force: false});
    await profesionales_consultorios.sync({force: false});
    await especialidad.sync({force: false});
    await profesionales_especialidades.sync({force: false});
    await obrasocial.sync({force: false});
    await profesionales_obrassociales.sync({force: false});
    await paciente.sync({force: false});
    await estadoturno.sync({force: false});
    await pago.sync({force: false});
    await agenda.sync({force: false});
    await modalidad.sync({force: false});
    await turno.sync({force: false});
    await calificacion.sync({force: false});
    await dia.sync({force: false});
    await horario.sync({force: false});
    await horarios_modalidades.sync({force: false});
    await citamedica.sync({force: false});
    await pedidoemergencia.sync({force: false});
    await citamedicaemergencia.sync({force: false});
    await prescripcion.sync({force: false});
    await indicacion.sync({force: false});
    await historiaclinica.sync({force: false});
    await episodio.sync({force: false});
    await mensajeria.sync({force: false});
    await mensaje.sync({force: false});

    // Create Especialidades in database
    cargarEspecialidades();
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