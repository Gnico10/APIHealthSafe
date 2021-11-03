import express, { Application } from 'express';
import cors from 'cors';
import sequelize from './db/connection';

import authRoutes from './routes/auth';
import userRoutes from './routes/usuarios';

import usuario from './models/usuario';
import paciente from './models/paciente';
import profesional from './models/profesional';
import especialidad from './models/especialidad';
import profesionales_especialidades from './models/prefesional_especialidad';


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
            await paciente.sync({alter: true});
            await profesional.sync({alter: true});
            await especialidad.sync({alter: true});
            await profesionales_especialidades.sync({alter: true});

            console.log('Base de datos conectada !!');
        } catch (error) {
            throw new Error(`Error al conectar con la base de datos: ${error}`);
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
        this.app.listen(this.port, () => {
            console.log(`El servidor está corriendo http://localhost:${this.port}`);
        });
    }
}

export default Server; // Esta clase se exporta por defecto.