# APIHealthSafe

Aplicación BackEndque despliega la API necesaria para servir los datos del sistema HealthSafe.

## Notas:

* La aplicación fué dockerizada para realizar su despliegue de una manera sencilla.

## Despliegue con Docker

Los archivos de Docker tienen la configuración necesaria para desplegar la aplicación en un contenedor con dos servicios (PostgreSQL y NodeJS).

Previamente debe ser descargado Docker desde [Docker Desktop]( https://www.docker.com/get-started )

* Abrir una terminal y posicionarse dentro de la carpeta del proyecto.
* Ejecutar ```docker compose up --build```. 

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
 
---
## Implementación con Heroku
Pasos para lanzar aplicación en Heroku.
 1. Registrarse con Heroku con ```heroku login```
 2. Crear una nueva aplicación en Heroku con ```heroku create```
 3. Agregar Addon DB de Postgresql	``` heroku addons:create heroku-postgresql:hobby-dev ```
 4. Subir applicación a Heroku con ```git push heroku main```
 5. Verificar que la aplicación se esté ejecutando en Heroku con ```heroku ps```


### Comandos utiles de Heroku
- Abrir la aplicación en Heroku: ```heroku open```
- Ver logs de la aplicación: ```heroku logs --tail```
- Ver variables de entorno (URI para conectarse con DB desde editor): ```heroku config```
- Ejecutar localmente: ```heroku local``` (Debe tener corriendo un servidor de postgres para conectarse)