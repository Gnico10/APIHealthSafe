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
import prescripcion from "../models/precripcion";
import profesionales_especialidades from "../models/prefesionales_especialidades";
import profesional from "../models/profesional";
import profesionales_consultorios from "../models/profesionales_consultorios";
import profesionales_obrassociales from "../models/profesionales_obrassociales";
import turno from "../models/turno";
import usuario from "../models/usuario";
import sequelize from "./connection";

const sincronizarDB = async() =>  {
    await sequelize.sync();
    // await usuario.sync({alter: true});
    // await obrasocial.sync({alter: true});
    // await paciente.sync({alter: true});
    // await profesional.sync({alter: true});
    // await profesionales_obrassociales.sync({alter: true});
    // await especialidad.sync({alter: true});
    // await profesionales_especialidades.sync({alter: true});
    // await calificacion.sync({alter: true});
    // await localidad.sync({alter: true});
    // await direccion.sync({alter: true});
    // await consultorio.sync({alter: true});
    // await profesionales_consultorios.sync({alter: true});
    // await estadoturno.sync({alter: true});
    // await modalidad.sync({alter: true});
    // await dia.sync({alter: true});
    // await agenda.sync({alter: true});
    // await horario.sync({alter: true});
    // await horarios_modalidades.sync({alter: true});
    // await pago.sync({alter: true});
    // await turno.sync({alter: true});
    // await citamedica.sync({alter: true});
    // await pedidoemergencia.sync({alter: true});
    // await citamedicaemergencia.sync({alter: true});
    // await prescripcion.sync({alter: true});
    // await indicacion.sync({alter: true});
    // await historiaclinica.sync({alter: true});
    // await episodio.sync({alter: true});
    // await mensajeria.sync({alter: true});
    // await mensaje.sync({alter: true});
}

export default sincronizarDB;