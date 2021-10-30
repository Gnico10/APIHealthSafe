"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            default: '*'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        // Métodos iniciales.
        this.middlewares();
        // Define las rutas del api.
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor está corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server; // Esta clase se exporta por defecto.
//# sourceMappingURL=server.js.map