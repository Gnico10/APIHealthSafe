import express, {Application} from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuarios';


class Server {

    private app : Application;
    private port : string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        default: '*'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Métodos iniciales.
        this.middlewares();

        // Define las rutas del api.
        this.routes();
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
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor está corriendo  http://localhost:${this.port}`);
        });
    }
}

export default Server; // Esta clase se exporta por defecto.