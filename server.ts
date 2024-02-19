import path from 'path';
import cors from 'cors';
import http from 'http';
import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import sequelize from './db/connection';
import sincronizarDB from './db/sincronizarDB';
import authRoutes from './routes/auth';
import userRoutes from './routes/usuarios';
import profesionalRoutes from './routes/profesionales';
import pacienteRoutes from './routes/pacientes';
import tipoantecedenteRoutes from './routes/tiposantecedentes';
import antecedenteRoutes from './routes/antecedentes';
import turnoRoutes from  './routes/turnos';
import agendaRoutes from  './routes/agendas';
import especialidadRoutes from  './routes/especialidades';
import profesionalesespecialidades from './routes/profesionalesespecialidades';
import paisesRoutes from './routes/paises';
import rolesRoutes from './routes/roles';
import universidadesRoutes from './routes/universidades';
import tiposmatriculasRoutes from './routes/tiposmatriculas';
import colegiosmedicosRoutes from './routes/colegiosmedicos';
import localidadesRoutes from './routes/localidades';
import modalidadesRoutes from './routes/modalidades';
import titulosgradosRoutes from './routes/titulosgrados';
import mensajesRoutes from './routes/mensajes';
import mensajeriaRoutes from './routes/mensajeria';
import registroshistoriasclinicasRoutes from './routes/registroshistoriasclinicas';
import consultorioRoutes from './routes/consultorio';
import medicamentoRoutes from './routes/medicamentos';
import tiposindicacionesgeneralesRoutes from './routes/tipoindicacionesgenerales';
import profesionalesmatriculas from './routes/profesionalesmatriculas';
import cuentamercadoPago from './routes/cuentamercadopago';

class Server {
    private app : Application;
    private port : string;
    public server: any;
    
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/usuarios',
        turnos: '/api/turnos',
        profesional: '/api/profesionales',
        pacientes: '/api/pacientes',
        tipoantecedente: '/api/tipoantecedente',
        antecedente: '/api/antecedentes',
        agendas: '/api/agendas',
        especialidades: '/api/especialidades',
        profesionales_especialidades: '/api/profesionales_especialidades',
        paises: '/api/paises',
        medicamentos: '/api/medicamentos',
        roles: '/api/roles',
        universidades: '/api/universidades',
        tiposmatriculas: '/api/tiposmatriculas',
        colegiosmedicos: '/api/colegiosmedicos',
        localidades: '/api/localidades',
        modalidades: '/api/modalidades',
        titulosgrados: '/api/titulosgrados',
        mensajes:'/api/mensajes',
        mensajeria:'/api/mensajerias',
        registroshistoriasclinicas: '/api/registroshistoriasclinicas',
        consultorios: '/api/consultorios',
        tiposindicacionesgenerales:  '/api/tiposindicacionesgenerales',
        profesionales_matriculas: '/api/profesionales_matriculas',
        cuenta_mercado_pago: '/api/cuentamercadopago',
        // Más rutas
        default: '*'
    }
      
    private swaggerSpec: swaggerJsDoc.Options;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.server = http.createServer(this.app);

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
            console.log('\x1b[31m','╭──────────────  Health Safe API  ──────────────╮\n');
            console.log('\x1b[32m','           Base de datos conectada !!');
            console.log('\x1b[32m',`     App corriendo en  http://localhost:${this.port}`);
            console.log('\x1b[31m','╰───────────────────────────────────────────────╯');
            console.log('\x1b[0m');
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
        this.app.use('/uploads', express.static('uploads'));

        // Documentación Swagger;
        this.app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(this.swaggerSpec)));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.profesional, profesionalRoutes);
        this.app.use(this.apiPaths.pacientes, pacienteRoutes);
        this.app.use(this.apiPaths.tipoantecedente, tipoantecedenteRoutes);
        this.app.use(this.apiPaths.antecedente, antecedenteRoutes);
        this.app.use(this.apiPaths.turnos, turnoRoutes);
        this.app.use(this.apiPaths.agendas, agendaRoutes);
        this.app.use(this.apiPaths.especialidades, especialidadRoutes);
        this.app.use(this.apiPaths.profesionales_especialidades, profesionalesespecialidades);
        this.app.use(this.apiPaths.paises, paisesRoutes);
        this.app.use(this.apiPaths.roles, rolesRoutes);
        this.app.use(this.apiPaths.universidades, universidadesRoutes);
        this.app.use(this.apiPaths.tiposmatriculas, tiposmatriculasRoutes);
        this.app.use(this.apiPaths.colegiosmedicos, colegiosmedicosRoutes);
        this.app.use(this.apiPaths.localidades, localidadesRoutes);
        this.app.use(this.apiPaths.modalidades, modalidadesRoutes);
        this.app.use(this.apiPaths.titulosgrados, titulosgradosRoutes);
        this.app.use(this.apiPaths.mensajes, mensajesRoutes);
        this.app.use(this.apiPaths.mensajeria, mensajeriaRoutes);
        this.app.use(this.apiPaths.registroshistoriasclinicas, registroshistoriasclinicasRoutes);
        this.app.use(this.apiPaths.consultorios, consultorioRoutes);
        this.app.use(this.apiPaths.medicamentos, medicamentoRoutes);
        this.app.use(this.apiPaths.tiposindicacionesgenerales, tiposindicacionesgeneralesRoutes);
        this.app.use(this.apiPaths.profesionales_matriculas, profesionalesmatriculas)
        this.app.use(this.apiPaths.cuenta_mercado_pago, cuentamercadoPago)

        // Ruta por defecto.
        this.app.get('*', (_req, res) => {
            res.redirect('/api-doc'); // Redirecciona a la documentación.
        });
    }

    listen() {
        this.server.listen(this.port);
    }
}

export default Server; // Esta clase se exporta por defecto.
