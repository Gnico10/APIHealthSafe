import path from 'path';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import http from 'http';
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
import paisesRoutes from './routes/paises';
import rolesRoutes from './routes/roles';
import universidadesRoutes from './routes/universidades';
import tiposmatriculasRoutes from './routes/tiposmatriculas';
import colegiosmedicosRoutes from './routes/colegiosmedicos';
import localidadesRoutes from './routes/localidades';
import modalidadesRoutes from './routes/modalidades';

// Importar los paquetes necesarios
import express, { Request, Response, Application } from 'express';
import { Server } from 'socket.io';
import Mensajeria from './models/mensajeria';
import Mensaje from './models/mensaje';

// Inicializar la aplicación Express y el servidor HTTP
const app = express();
const server = http.createServer(app);

// Inicializar el servidor Socket.io
const io = new Server(server);

// Configurar la conexión de Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  
  // Manejar la recepción de mensajes de un usuario
  socket.on('mensaje', async (data) => {
    const { idmensajeria, mensaje } = data;
    
    // Guardar el mensaje en la base de datos
    const nuevoMensaje = await Mensaje.create({ idmensajeria, mensaje });
    
    // Enviar el mensaje a todos los usuarios conectados a la misma mensajería
    io.to(`mensajeria-${idmensajeria}`).emit('mensaje', nuevoMensaje);
  });
  
  // Manejar la conexión de un usuario a una mensajería
  socket.on('conectar', (data) => {
    const { idmensajeria } = data;
    
    // Unir al usuario a la sala correspondiente a la mensajería
   socket.join(`mensajeria-${idmensajeria}`);
  });
  
  // Manejar la desconexión de un usuario
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Configurar las rutas de la aplicación
app.get('/mensajerias', async (req: Request, res: Response) => {
  // Obtener todas las mensajerías de la base de datos
  const mensajerias = await Mensajeria.findAll();
  
  // Enviar las mensajerías como respuesta
  res.json(mensajerias);
});

app.get('/mensajerias/:id/mensajes', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Obtener todos los mensajes de una mensajería específica
  const mensajes = await Mensaje.findAll({ where: { idmensajeria: id } });
  
  // Enviar los mensajes como respuesta
  res.json(mensajes);
});

// Iniciar el servidor
sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
});

class Servers {

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
        paises: '/api/paises',
        roles: '/api/roles',
        universidades: '/api/universidades',
        tiposmatriculas: '/api/tiposmatriculas',
        colegiosmedicos: '/api/colegiosmedicos',
        localidades: '/api/localidades',
        modalidades: '/api/modalidades',
        mensajes:'/api/mensajes',
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
        this.app.use(this.apiPaths.paises, paisesRoutes);
        this.app.use(this.apiPaths.roles, rolesRoutes);
        this.app.use(this.apiPaths.universidades, universidadesRoutes);
        this.app.use(this.apiPaths.tiposmatriculas, tiposmatriculasRoutes);
        this.app.use(this.apiPaths.colegiosmedicos, colegiosmedicosRoutes);
        this.app.use(this.apiPaths.localidades, localidadesRoutes);
        this.app.use(this.apiPaths.modalidades, modalidadesRoutes);
        this.app.use(this.apiPaths.mensajes, modalidadesRoutes);

        // Ruta por defecto.
        this.app.get('*', (_req, res) => {
            res.redirect('/api-doc'); // Redirecciona a la documentación.
        });
    }

    listen() {
        this.app.listen(this.port);
    }
}


export default Servers; // Esta clase se exporta por defecto.