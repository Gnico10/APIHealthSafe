import Agenda from "../../models/agenda";
import Consultorio from "../../models/consultorio";
import Direccion from "../../models/direccion";
import ProfesionalMatricula from "../../models/profesionalmatricula";
import Profesional from "../../models/profesional";
import Titulogrado from "../../models/titulogrado";
import Usuario from "../../models/usuario";
import ProfesionalEspecialidad from "../../models/especialidadprofesional";
 
const loadProfesional = async() => {
    const direccion = await Direccion.create({
        calle: "25 de Mayo",
        numero: 372,
        piso: "",
        codpostal: '4000'
    })

    // Profesional 1
    const usuario = await Usuario.create({
        correo: 'mariajuarez@gmail.com',
        contrasena: '123456',
        dni: 14852369,
        nombre: "Maria",
        apellido: "Juarez",
        fechanacimiento: "1970-05-28",
        sexo: "F",
        imgperfil: "https://media.istockphoto.com/id/1302981374/es/foto/atractiva-mujer-sentada-en-el-sof%C3%A1-en-casa-y-riendo.jpg?s=612x612&w=0&k=20&c=zVE8zNEljSn_yZc2Z7WvldprTAVsFsJpDsQeRW2tF7E=",
        imgdnifrente: "https://lapostadigital.com.ar/vistas/fotos_noticias/2460-nuevo-dni.jpg",
        imgdnidorso: "https://cdn.lavoz.com.ar/sites/default/files/styles/landscape_565_318/public/nota_periodistica/40_1606302832.jpg",
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
        fechadesde: "2024-02-20",
        fechahasta: "2024-02-25",
        horainicio: "10:00",
        horafin: "22:00",
        duracion: 15,
        precio: 5000.0,
        idprofesional: profesional.idprofesional,
        idmodalidad: 2,
        idconsultorio: null
    })

    const consultorio = await Consultorio.create({
        descripcion: "Sanatorio 9 de Julio",
        iddireccion: direccion.iddireccion,
        idprofesional: profesional.idprofesional
    })

    await Agenda.create({
        fechadesde: "2024-03-01",
        fechahasta: "2024-03-15",
        horainicio: "10:00",
        horafin: "14:00",
        duracion: 30,
        precio: 5000.0,
        idprofesional: profesional.idprofesional,
        idmodalidad: 1,
        idconsultorio: consultorio.idconsultorio
    })

    // Profesional 2
    const usuario2 = await Usuario.create({
        correo: 'joserufino@gmail.com',
        contrasena: '123456',
        dni: 30854512,
        nombre: "Maria",
        apellido: "Juarez",
        fechanacimiento: "1990-02-28",
        sexo: "M",
        imgperfil: "https://media.istockphoto.com/id/1355434699/es/foto/retrato-de-un-apuesto-farmac%C3%A9utico-que-trabaja-en-una-farmacia.jpg?s=612x612&w=0&k=20&c=98IZzPdvfAgPh6NMRV7y3vJz5HS8b9mgplJcuKYgfPo=",
        imgdnifrente: "https://lapostadigital.com.ar/vistas/fotos_noticias/2460-nuevo-dni.jpg",
        imgdnidorso: "https://cdn.lavoz.com.ar/sites/default/files/styles/landscape_565_318/public/nota_periodistica/40_1606302832.jpg",
        idrol: 2
    })

    const profesional2 = await Profesional.create({
        idusuario: usuario2.idusuario,
        descripcion: "Medico General con orientación en pediatria"
    })

    await ProfesionalMatricula.create({
        numero: 123235,
        aniootorgamiento: 2018,
        idprofesional: profesional2.idprofesional,
        idtipomatricula: 1,
        iduniversidad: 2,
        idtitulogrado: 2
    })

    await ProfesionalEspecialidad.create({
        aniootorgamiento: 2019,
        idprofesional: profesional2.idprofesional,
        idespecialidad: 2,
        idcolegiomedico: 2
    })

    await Agenda.create({
        fechadesde: "2024-02-20",
        fechahasta: "2024-02-25",
        horainicio: "10:00",
        horafin: "22:00",
        duracion: 15,
        precio: 5000.0,
        idprofesional: profesional2.idprofesional,
        idmodalidad: 2,
        idconsultorio: null
    })

    const consultorio2 = await Consultorio.create({
        descripcion: "Sanatorio 9 de Julio",
        iddireccion: direccion.iddireccion,
        idprofesional: profesional2.idprofesional
    })

    await Agenda.create({
        fechadesde: "2024-03-01",
        fechahasta: "2024-03-15",
        horainicio: "10:00",
        horafin: "14:00",
        duracion: 30,
        precio: 5000.0,
        idprofesional: profesional2.idprofesional,
        idmodalidad: 1,
        idconsultorio: consultorio2.idconsultorio
    })
}

export default loadProfesional;