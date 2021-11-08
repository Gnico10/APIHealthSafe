import express, { Application } from 'express';
import cors from 'cors';
import sequelize from './db/connection';

import authRoutes from './routes/auth';
import userRoutes from './routes/usuarios';

import usuario from './models/usuario';
import paciente from './models/paciente';
import profesional from './models/profesional';
import especialidad from './models/especialidad';
import localidad from './models/localidad';
import direccion from './models/direccion';
import consultorio from './models/consultorio';
import profesionales_consultorios from './models/profesionales_consultorios';
import obrasocial from './models/obrasocial';
import profesionales_obrassociales from './models/profesionales_obrassociales';
import calificacion from './models/calificacion';
import profesionales_especialidades from './models/prefesionales_especialidades';
import estadoturno from './models/estadoturno';
import modalidad from './models/modalidad';
import dia from './models/dias';
import agenda from './models/agenda';
import horario from './models/horario';
import horarios_modalidades from './models/horarios_modalidades';
import turno from './models/turno';
import citamedica from './models/citamedica';
import citamedicaemergencia from './models/citamedicaemergencia';
import episodio from './models/episodio';
import mensajeria from './models/mensajeria';
import mensaje from './models/mensaje';
import pago from './models/pago';
import pedidoemergencia from './models/pedidoemergencia';
import prescripcion from './models/precripcion';
import indicacion from './models/indicacion';
import historiaclinica from './models/historiaclinica';


class Server {

    private app : Application;
    private port : string;
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
        default: '*'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Conexión a la base de datos.
        this.dbConnection();

        // Métodos iniciales.
        this.middlewares();

        // Define las rutas del api.
        this.routes();
    }

    async dbConnection() {
        try{
            await sequelize.authenticate();

            // await sequelize.sync({alter: true});
            await usuario.sync({alter: true});
            await obrasocial.sync({alter: true});
            await paciente.sync({alter: true});
            await profesional.sync({alter: true});
            await profesionales_obrassociales.sync({alter: true});
            await especialidad.sync({alter: true});
            await profesionales_especialidades.sync({alter: true});
            await calificacion.sync({alter: true});
            await localidad.sync({alter: true});
            await direccion.sync({alter: true});
            await consultorio.sync({alter: true});
            await profesionales_consultorios.sync({alter: true});
            await estadoturno.sync({alter: true});
            await modalidad.sync({alter: true});
            await dia.sync({alter: true});
            await agenda.sync({alter: true});
            await horario.sync({alter: true});
            await horarios_modalidades.sync({alter: true});
            await pago.sync({alter: true});
            await turno.sync({alter: true});
            await citamedica.sync({alter: true});
            await pedidoemergencia.sync({alter: true});
            await citamedicaemergencia.sync({alter: true});
            await prescripcion.sync({alter: true});
            await indicacion.sync({alter: true});
            await historiaclinica.sync({alter: true});
            await episodio.sync({alter: true});
            await mensajeria.sync({alter: true});
            await mensaje.sync({alter: true});

            console.log();
            console.log('\x1b[31m','╭──────────────  Health Safe API  ──────────────╮');
            console.log('\x1b[32m','│                                               │');
            console.log('\x1b[32m','│          Base de datos conectada !!           │');
            console.log('\x1b[32m',`│    App corriendo en  http://localhost:${this.port}    │`);
            console.log('\x1b[32m','│                                               │');
            console.log('\x1b[31m','╰───────────────────────────────────────────────╯');
            console.log('\x1b[0m');

            // console.log('\x1b[31m', '───────────────────── Health Safe API ─────────────────────');
            // console.log('\x1b[32m', '    Base de datos conectada !!');
            // console.log('\x1b[32m', `    El servidor está corriendo en: http://localhost:${this.port}`);
            // console.log('\x1b[31m', '───────────────────────────────────────────────────────────');
        } catch (error) {
            console.log('\x1b[31m','Error al conectar con la base de datos:');
            console.log('\x1b[31m','- Asegurarse de tener levantado el servicio PostgreSQL.');
            console.log('\x1b[0m');
            throw new Error((error as string));
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura body
        this.app.use(express.json());

        // Carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.usuarios, userRoutes);

        // Ruta por defecto.
        this.app.get('*', (req, res) => {
            res.send('Ruta Inválida.');
        });
    }

    listen() {
        this.app.listen(this.port);
    }
}

export default Server; // Esta clase se exporta por defecto.