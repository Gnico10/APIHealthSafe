import path from 'path';
import express, { Application } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import sequelize from './db/connection';
import sincronizarDB from './db/sincronizarDB';

import authRoutes from './routes/auth';
import userRoutes from './routes/usuarios';
import profesionalRoutes from './routes/profesionales';
import pacienteRoutes from './routes/pacientes';
import turnoRoutes from  './routes/turnos';
import agendaRoutes from  './routes/agendas';
import especialidadRoutes from  './routes/especialidades';
import profesionales_especialidadesRoutes from './routes/profesionales_especialidades';

class Server {

    private app : Application;
    private port : string;
    
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
        turnos: '/api/turnos',
        profesional: '/api/profesionales',
        pacientes: '/api/pacientes',
        agendas: '/api/agendas',
        especialidades: '/api/especialidades',
        profesionales_especialidades: '/api/profesionales_especialidades',        
        // Más rutas
        default: '*'
    }

    private swaggerSpec: swaggerJsDoc.Options;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Configuración de Swagger
        this.swaggerSpec = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Health Safe API',
                    version: '1.0.0',
                    description: 'API para el proyecto Health Safe',
                    license: {
                        name: 'Apache 2.0',
                        url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
                    },
                },
                servers: [
                    {
                        url: `http://localhost:${this.port}`,
                        description: 'Servidor de pruebas'
                    }
                ],
            },
            apis: [path.join(__dirname, './routes/*.js')]
        };

        // Conexión a la base de datos.
        this.dbConnection();

        // Métodos iniciales.
        this.middlewares();

        // Define las rutas del api.
        this.routes();
    }

    async dbConnection() {
        try{
            // Se conecta a la base de datos.
            await sequelize.authenticate();

            // Sincroniza el modelo con las tablas de la base de datos.
            await sincronizarDB();

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

        // Documentación Swagger;
        this.app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(this.swaggerSpec)));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.profesional, profesionalRoutes);
        this.app.use(this.apiPaths.pacientes, pacienteRoutes);
        this.app.use(this.apiPaths.turnos, turnoRoutes);
        this.app.use(this.apiPaths.agendas, agendaRoutes);
        this.app.use(this.apiPaths.especialidades, especialidadRoutes);
        this.app.use(this.apiPaths.profesionales_especialidades, profesionales_especialidadesRoutes);

        // Ruta por defecto.
        this.app.get('*', (req, res) => {
            res.redirect('/api-doc'); // Redirecciona a la documentación.
        });
    }

    listen() {
        this.app.listen(this.port);
    }
}

export default Server; // Esta clase se exporta por defecto.