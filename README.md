# APIHealthSafe

Aplicación BackEnd que despliega la API necesaria para servir los datos del sistema HealthSafe.

## Notas:

* La aplicación fué dockerizada para realizar su despliegue de una manera sencilla.

## Despliegue con Docker

Los archivos de Docker tienen la configuración necesaria para desplegar la aplicación en un contenedor con dos servicios (PostgreSQL y NodeJS).

Previamente debe ser descargado Docker desde [Docker Desktop]( https://www.docker.com/get-started )

* Abrir una terminal y posicionarse dentro de la carpeta del proyecto.
* Ejecutar ```docker compose up --build```. 
  * También puede utilizar el comando ```npm run docker```.

Puede tardar un poco en transpilarse, esperar hasta que indique que la base de datos fué conectada.

Será notificado por consola la dirección en la cual fué servida la aplicación.
* Actualmente en http://localhost:8080

## Despliegue Local, para desarrollo

Para trabajar localmente se necesita desplegar un servidor de Postgres con anterioridad y tener NodeJS instalado localmente.
 * Abrir una terminal y posicionarse dentro de la carpeta del proyecto.
 * Instalar las dependencias de Node con ```npm install```
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
       
  * Desplegar la aplicación con el comando ```npm start```.
    * También puede utilizar el comando ```npm run dev```

Será notificado por consola la dirección en la cual fué servida la aplicación.

  * Actualmente en http://localhost:8000

---
## Conectarse a la base de datos en PostgreSQL

Docker tiene configurado una pgAdmin, un gestor de base de datos PostgreSQL.
Para acceder a el se debe ingresar a http://localhost:5050 , los datos de ingresos son los siguientes:

  ~~~
  Usuario: postgres@healtsafe.com
  Contraseña: postgres
  ~~~

Una vez dentro, se debe agregar un nuevo servidor de modo que se conecte a postgres.

  ~~~
  host: web-db
  Usuario: postgres
  Contraseña: postgres
  ~~~
