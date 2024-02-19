import Usuario from "../../models/usuario";
import Paciente from "../../models/paciente";

const loadPaciente = async() => {
    // Paciente 1
    const usuario1 = await Usuario.create({
        correo: 'paciente1@gmail.com',
        contrasena: '123456',
        dni: 20852369,
        nombre: "Juan",
        apellido: "Perez",
        fechanacimiento: "1974-05-30",
        sexo: "M",
        imgperfil: "https://media.istockphoto.com/id/1089181936/es/foto/hombre-maduro-sonriente-mirando-la-c%C3%A1mara.jpg?s=612x612&w=0&k=20&c=Jy4ucI-dCtDaZklEf8yAqBqvaFRmL3HatHKxsQTCef0=",
        imgdnifrente: "https://lapostadigital.com.ar/vistas/fotos_noticias/2460-nuevo-dni.jpg",
        imgdnidorso: "https://cdn.lavoz.com.ar/sites/default/files/styles/landscape_565_318/public/nota_periodistica/40_1606302832.jpg",
        idrol: 1
    })

    await Paciente.create({
        ocupacion: 'Jubilado',
        idusuario: usuario1.idusuario
    })

    // Paciente 2
    const usuario2 = await Usuario.create({
        correo: 'paciente2@gmail.com',
        contrasena: '123456',
        dni: 35852370,
        nombre: "Maria Juana",
        apellido: "Dominguez",
        fechanacimiento: "1990-05-30",
        sexo: "F",
        imgperfil: "https://media.istockphoto.com/id/1363286867/es/foto/retrato-de-una-mujer-sonriente.jpg?s=612x612&w=0&k=20&c=7CSLJxESWrQKNmh11wlC0bNWC4dKVJcc6c5q5uZxSY8=",
        imgdnifrente: "https://lapostadigital.com.ar/vistas/fotos_noticias/2460-nuevo-dni.jpg",
        imgdnidorso: "https://cdn.lavoz.com.ar/sites/default/files/styles/landscape_565_318/public/nota_periodistica/40_1606302832.jpg",
        idrol: 1
    })

    await Paciente.create({
        ocupacion: 'Ingeniera biologa',
        idusuario: usuario2.idusuario
    })

    // Paciente 3
    const usuario3 = await Usuario.create({
        correo: 'paciente3@gmail.com',
        contrasena: '123456',
        dni: 40852370,
        nombre: "Ernesto Luis",
        apellido: "Sabato",
        fechanacimiento: "2001-05-30",
        sexo: "M",
        imgperfil: "https://media.istockphoto.com/id/1354851464/es/foto/hombre-guapo-con-hermosa-sonrisa-que-representa-la-diversidad.jpg?s=612x612&w=0&k=20&c=bXY2BoNjU6mRAPKkImd6GiaWRzRF8SZ_8UONcmKQ5eM=",
        imgdnifrente: "https://lapostadigital.com.ar/vistas/fotos_noticias/2460-nuevo-dni.jpg",
        imgdnidorso: "https://cdn.lavoz.com.ar/sites/default/files/styles/landscape_565_318/public/nota_periodistica/40_1606302832.jpg",
        idrol: 1
    })

    await Paciente.create({
        ocupacion: 'Estudiante',
        idusuario: usuario3.idusuario
    })
}

export default loadPaciente;