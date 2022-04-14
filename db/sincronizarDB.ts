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

    await usuario.sync({force: true});
    await profesional.sync({force: true});
    await localidad.sync({force: true});
    await direccion.sync({force: true});
    await consultorio.sync({force: true});
    await profesionales_consultorios.sync({force: true});
    await especialidad.sync({force: true});
    await profesionales_especialidades.sync({force: true});
    await obrasocial.sync({force: true});
    await profesionales_obrassociales.sync({force: true});
    await paciente.sync({force: true});
    await estadoturno.sync({force: true});
    await pago.sync({force: true});
    await agenda.sync({force: true});
    await modalidad.sync({force: true});
    await turno.sync({force: true});
    await calificacion.sync({force: true});
    await dia.sync({force: true});
    await horario.sync({force: true});
    await horarios_modalidades.sync({force: true});
    await citamedica.sync({force: true});
    await pedidoemergencia.sync({force: true});
    await citamedicaemergencia.sync({force: true});
    await prescripcion.sync({force: true});
    await indicacion.sync({force: true});
    await historiaclinica.sync({force: true});
    await episodio.sync({force: true});
    await mensajeria.sync({force: true});
    await mensaje.sync({force: true});
}

export default sincronizarDB;