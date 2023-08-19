import Agenda from "../../models/agenda";
import Consultorio from "../../models/consultorio";
import Direccion from "../../models/direccion";
import ProfesionalMatricula from "../../models/profesionalmatricula";
import Profesional from "../../models/profesional";
import Titulogrado from "../../models/titulogrado";
import Usuario from "../../models/usuario";
import ProfesionalEspecialidad from "../../models/especialidadprofesional";
 
const loadProfesional = async() => {
    
    const usuario = await Usuario.create({
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
    })

    const profesional = await Profesional.create({
        idusuario: usuario.idusuario,
        descripcion: "Medico General con orientación en nutricion y endocrinología"
    })

    await ProfesionalMatricula.create({
        numero: 123456,
        aniootorgamiento: 2015,
        idprofesional: profesional.idprofesional,
        idtipomatricula: 1,
        iduniversidad: 1,
        idtitulogrado: 1
    })

    await ProfesionalEspecialidad.create({
        aniootorgamiento: 2010,
        idprofesional: profesional.idprofesional,
        idespecialidad: 1,
        idcolegiomedico: 1
    })

    await Agenda.create({
        fechadesde: "2023-08-28",
        fechahasta: "2023-08-28",
        horainicio: "10:00",
        horafin: "13:00",
        duracion: 15,
        precio: 500.0,
        idprofesional: profesional.idprofesional,
        idmodalidad: 2,
        idconsultorio: null
    })
     
    const direccion = await Direccion.create({
        calle: "25 de Mayo",
        numero: 480,
        piso: "",
        codpostal: '4000'
    })

    const consultorio = await Consultorio.create({
        descripcion: "Sanatorio 9 de Julio",
        iddireccion: direccion.iddireccion,
        idprofesional: profesional.idprofesional
    })

    await Agenda.create({
        fechadesde: "2023-08-30",
        fechahasta: "2023-08-30",
        horainicio: "10:00",
        horafin: "11:00",
        duracion: 15,
        precio: 500.0,
        idprofesional: profesional.idprofesional,
        idmodalidad: 1,
        idconsultorio: consultorio.idconsultorio
    })
}

export default loadProfesional;