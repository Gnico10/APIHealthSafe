# HealthSafeAPI
Aplicación BackEnd que despliega la API necesaria para servir los datos del sistema HealthSafe.

## Notas:
* La aplicación fué dockerizada para realizar su despliegue de una manera sencilla.

* Para trabajar localmente se necesita desplegar un servidor de Postgres con anterioridad y tener NodeJS instalado localmente.
  * Instalar las dependencias de Node con ```npm install``` 
  * Descargar TypeScript ```npm i -g typescript``` 
  * Correr comando ```tsc``` para compilar la aplicación en TypeScript.
  * Crear archivo de entorno ```.env``` con los siguientes datos.
  
      ~~~
      PORT=8000 
      
      DATABASE=API
      USERNAMEDB=postgres
      PASSWORDDB=postgres
      HOSTDB=localhost
      PORTDB=5432
      SECRETORPRIVATEKEY=6%J5HDD-x{.[@~#MrZ&xr7*A`yUj48
      ~~~
      
       * PORT: Puerto en el cual se desplegará la aplicación.
       * DATABASE: Nombre de la base de datos en PostgreSQL.
       * USERNAMEDB: Usuario del servidor de la base de datos.
       * PASSWORDDB: Contraseña del servidor de la base de datos.
       * HOSTDB: Dirección del Host que corre la base de datos.
       * PORTDB: Puerto en el cual corre la base datos.
       * SECRETORPRIVATEKEY: Utilizada para firmar token de acceso.
       
  * Desplegar la aplicación con el comando ```node .\dist\app.js```.
 
## Despliegue con Docker.
Los archivos de Docker tienen la configuración necesaria para desplegar la aplicación en un contenedor con dos servicios (PostgreSQL y NodeJS).

Previamente debe ser descargado Docker desde [Docker Desktop]( https://www.docker.com/get-started )

* Para correr el servidor de Docker se debe transpilar previamente la aplicación con TypeScript utilizando los comandos ```npm install``` y ```tsc```. 
** (Esto es así hasta que se corriga la transpilación automática desde el contenedor.)

* Ejecutar ```docker compose build | docker compose up```. 

Será notificado por consola la dirección en la cual fué servida la aplicación.
 
