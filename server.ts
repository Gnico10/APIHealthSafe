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
            await especialidad.sync({alter: true});
            await profesionales_especialidades.sync({alter: true});
            await calificacion.sync({alter: true});
            await localidad.sync({alter: true});
            await direccion.sync({alter: true});
            await consultorio.sync({alter: true});
            await profesionales_consultorios.sync({alter: true});
            await profesionales_obrassociales.sync({alter: true});

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