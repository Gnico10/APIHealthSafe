FROM node:14

RUN mkdir -p /src
WORKDIR /src
COPY ./package*.json ./
RUN npm install 

COPY ./ ./

EXPOSE 8080
CMD node ./dist/app.js