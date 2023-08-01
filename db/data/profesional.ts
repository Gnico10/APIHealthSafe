import Agenda from "../../models/agenda";
import Consultorio from "../../models/consultorio";
import Direccion from "../../models/direccion";
import Matriculaprofesional from "../../models/matriculaprofesional";
import Profesional from "../../models/profesional";
import Profesionales_especialidades from "../../models/profesionales_especialidades";
import Titulogrado from "../../models/titulogrado";
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
         imgperfil: "https://res.cloudinary.com/healthsafeapp/image/upload/v1688521045/fuh79r6yje1gcakegytn.jpg",
         imgdnifrente: "https://res.cloudinary.com/healthsafeapp/image/upload/v1688521045/fuh79r6yje1gcakegytn.jpg",
         imgdnidorso: "https://res.cloudinary.com/healthsafeapp/image/upload/v1688521045/fuh79r6yje1gcakegytn.jpg",
         idrol: 2
     }})

     await Profesional.findOrCreate({
         where: {idprofesional: 99},
         defaults: {
         idprofesional: 99,
         idusuario: 99,
         descripcion: "Medico General con orientación en nutricion y endocrinología"
     }})

     await Titulogrado.findOrCreate({
        where: {idtitulogrado: 1},
        defaults: {
            idtitulogrado: 1,
            descripcion: "Médico General"
        }
     })

     await Matriculaprofesional.findOrCreate({
         where: {idmatriculaprofesional: 1},
         defaults: {
             idmatriculaprofesional: 1,
             numero: 1,
             aniootorgamiento: 2015,
             idtipomatricula: 1,
             iduniversidad: 1,
             idprofesional: 99,
             idtitulogrado: 1
         }
     })

     await Profesionales_especialidades.findOrCreate({
         where: {idprofesionalesespecialidades: 1},
         defaults: {
         idprofesionalesespecialidades: 1,
         aniootorgamiento: 2010,
         idcolegiomedico: 1,
         idprofesional: 99,
         idespecialidad: 1
     }})

     await Agenda.findOrCreate({
         where: {idagenda: 1},
         defaults: {
         idagenda: 1,
         fechadesde: "2023-08-02",
         fechahasta: null,
         horainicio: "10:00",
         horafin: "11:00",
         duracion: 15,
         precio: 500.0,
         idprofesional: 99,
         idmodalidad: 2,
         idconsultorio: null
     }})
     
     await Direccion.findOrCreate({
        where: {iddireccion: 1},
        defaults: {
            iddireccion: 1,
            calle: "25 de Mayo",
            numero: 480,
            piso: "",
            codpostal: '4000'
        }

     })

     await Consultorio.findOrCreate({
        where: {idconsultorio: 1},
        defaults: {
            idconsultorio: 1,
            descripcion: "Sanatorio 9 de Julio",
            iddireccion: 1,
            idprofesional:99
        }
     })

     await Agenda.findOrCreate({
        where: {idagenda: 1},
        defaults: {
        idagenda: 1,
        fechadesde: "2023-08-08",
        fechahasta: null,
        horainicio: "10:00",
        horafin: "11:00",
        duracion: 15,
        precio: 500.0,
        idprofesional: 99,
        idmodalidad: 1,
        idconsultorio: 1
    }})
 }

 export default loadProfesional;