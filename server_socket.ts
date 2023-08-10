// Importar los paquetes necesarios
import { Server } from 'socket.io';

class ServerSocket {
    public io: Server;

    constructor(server:any){
        this.io = new Server(server, { cors: { origin: '*' } });
    }

} 

export default ServerSocket;
