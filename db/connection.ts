import {Sequelize} from 'sequelize';

let database : string = process.env.DATABASE || 'API';
let usernamedb : string = process.env.USERNAMEDB || 'postgres';
let passworddb : string = process.env.PASSWORDDB || 'postgres';
let hostdb : string = process.env.HOSTDB || 'localhost';
const portdb : string = process.env.PORTDB  || '5432';

// Heroku Postgres config
let herokudatabase : string = process.env.DATABASE_URL || '';

if (herokudatabase !== '') {
    //postgres://pmbfldzbowmrmv:9876c01f8ce8e6461979a7a7c845b8d756afe018dba3f390b02bc82139548b2e@ec2-52-86-56-90.compute-1.amazonaws.com:5432/d9arna9nf226me
    console.log(`Heroku DB: ${herokudatabase}`);
    herokudatabase = herokudatabase.replace('postgres://', ''); // Remove postgres://
    usernamedb = herokudatabase.split(':')[0]; // Get username
    passworddb = herokudatabase.split(':')[1].split('@')[0]; // Get password
    hostdb = herokudatabase.split('@')[1].split(':')[0]; // Get host
    database = herokudatabase.split('@')[1].split('/')[1]; // Get database
}

console.log(`DB: ${database}`);
console.log(`Username: ${usernamedb}`);
console.log(`Password: ${passworddb}`);
console.log(`Host: ${hostdb}`);

const sequelize = new Sequelize(database, usernamedb, passworddb, {
    host: hostdb,
    dialect: 'postgres',
    // logging: false
    port: (portdb as unknown as number),
    ssl: true
});

export default sequelize;