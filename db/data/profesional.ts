import Agenda from "../../models/agenda";
import Matriculaprofesional from "../../models/matriculaprofesional";
import Profesional from "../../models/profesional";
import Profesionales_especialidades from "../../models/profesionales_especialidades";
import Profesionales_matriculasprofesionales from "../../models/profesionales_matriculasprofesionales";
import Usuario from "../../models/usuario";

const loadProfesional = async() => {
    await Usuario.findOrCreate(
        {
            where: {idusuario: 99},
            defaults: {
        idusuario: 99,
        correo: 'mariajuarez@gmail.com',
        contrasena: '',
        dni: 14852369,
        nombre: "Maria",
        apellido: "Juarez",
        fechanacimiento: "1970-05-28",
        sexo: "F",
        imgperfil: "",
        imgdnifrente: "",
        imgdnidorso: "",
        idrol: 2
    }})

    await Profesional.findOrCreate({
        where: {idprofesional: 99},
        defaults: {
        idprofesional: 99,
        idusuario: 99,
        descripcion: ""
    }})

    await Matriculaprofesional.create({
        where: {idmatriculaprofesional: 1},
        defaults: {
            idmatriculaprofesional: 1,
            numero: 1,
            idtipomatricula: 1,
            iduniversidad: 1
        }
    })

    await Profesionales_especialidades.create({
        where: {idprofesionalesespecialidades: 1},
        defaults: {
        idprofesionalesespecialidades: 1,
        aniootorgamiento: 2010,
        idcolegiomedico: 1,
        idprofesional: 99,
        idespecialidad: 1
    }})

    await Profesionales_matriculasprofesionales.create({
        where: {idprofesionalesmatriculasprofesionales: 1},
        defaults: {
        idprofesionalesmatriculasprofesionales: 1,
        titulogrado: "Medico General",
        aniootorgamiento: 2009,
        idprofesional: 99,
        matriculaprofesional: 1
    }})

    await Agenda.create({
        where: {idagenda: 1},
        defaults: {
        idagenda: 1,
        fechadesde: "2023-07-02",
        fechahasta: null,
        horainicio: "10:00",
        horafin: "11:00",
        duracion: 15,
        precio: 500.0,
        idprofesional: 99,
        idmodalidad: 2,
        idconsultorio: null
    }})
}

export default loadProfesional;