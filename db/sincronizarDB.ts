import agenda from "../models/agenda";
import calificacion from "../models/calificacion";
import citamedica from "../models/citamedica";
import citamedicaemergencia from "../models/citamedicaemergencia";
import consultorio from "../models/consultorio";
import dia from "../models/dias";
import direccion from "../models/direccion";
import episodio from "../models/registroHistoriaClinica";
import especialidad from "../models/especialidad";
import historiaclinica from "../models/historiaclinica";
import indicacionGeneral from "../models/indicacionGeneral";
import indicacionMedicamento from "../models/indicacionMedicamento";
import localidad from "../models/localidad";
import mensaje from "../models/mensaje";
import mensajeria from "../models/mensajeria";
import modalidad from "../models/modalidad";
import paciente from "../models/paciente";
import tipoantecedente from "../models/tipoantecedente";
import antecedente from "../models/antecedente";
import pedidoemergencia from "../models/pedidoemergencia";
import prescripcion from "../models/prescripcion";
import profesionales_especialidades from "../models/profesionales_especialidades";
import profesional from "../models/profesional";
import turno from "../models/turno";
import usuario from "../models/usuario";
import rol from "../models/rol";
import pais from "../models/pais";
import tipomatricula from "../models/tipomatricula";
import universidad from "../models/universidad";
import matriculaprofesional from "../models/matriculaprofesional";
import profesionales_matriculasprofesionales from "../models/profesionales_matriculasprofesionales";
import colegiomedico from "../models/colegiomedico";
import registroHistoriaClinica from "../models/registroHistoriaClinica"

import load from "./load";


const sincronizarDB = async() =>  {
    // Sync all models that aren't already in the database
    // await sequelize.sync();

    await rol.sync({force: true});
    await usuario.sync({force: false});
    await profesional.sync({force: false});
    await localidad.sync({force: false});
    await direccion.sync({force: false});
    await consultorio.sync({force: false});
    await pais.sync({force: false});
    await especialidad.sync({force: false});
    await colegiomedico.sync({force: false});
    await profesionales_especialidades.sync({force: false});
    await tipomatricula.sync({force: false});
    await universidad.sync({force: false});
    await matriculaprofesional.sync({force: false});
    await profesionales_matriculasprofesionales.sync({force: false});
    await historiaclinica.sync({force: false});
    await paciente.sync({force: false});
    await tipoantecedente.sync({force: false});
    await antecedente.sync({force: false});
    await modalidad.sync({force: false});
    await agenda.sync({force: false});
    await turno.sync({force: false});
    await calificacion.sync({force: false});
    await dia.sync({force: false});
    await citamedica.sync({force: false});
    await pedidoemergencia.sync({force: false});
    await citamedicaemergencia.sync({force: false});
    await prescripcion.sync({force: false});
    await indicacionGeneral.sync({force: false});
    await indicacionMedicamento.sync({force: false});
    await episodio.sync({force: false});
    await mensajeria.sync({force: false});
    await mensaje.sync({force: false});
    await registroHistoriaClinica.sync({force: false});

    // load default data for DB
    load();
}
    

export default sincronizarDB;