FROM node:14

RUN mkdir -p /src
WORKDIR /src
COPY ./package*.json ./
COPY ./tsconfig*.json ./ 

# Instalar dependencias de node.
RUN npm install 

# Transpilar codigo de TypeScript
# RUN node_modules/.bin/tsc 

COPY ./ ./

EXPOSE 8080
CMD node ./dist/app.js