import express, {Application, Request, Response} from 'express';
import cors from 'cors';

import authRoutes from '../routes/auth';
import userRoutes from '../routes/usuarios';
import db from '../db/connection';


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
            await db.authenticate();
            await db.sync({alter: true});
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