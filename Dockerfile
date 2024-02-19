FROM node:14

ENV TZ=America/Argentina/Buenos_Aires

# Crear directorio de app.
RUN mkdir -p /src
WORKDIR /src

# Instalar dependencias de node.
COPY ./package*.json ./
RUN npm install 

# Copiar resto de archivos
COPY ./ ./

# Lanzar aplicación
EXPOSE 8080
CMD [ "npm", "start" ]