import {Options, Sequelize} from 'sequelize';

let database : string = process.env.DATABASE || 'API';
let usernamedb : string = process.env.USERNAMEDB || 'postgres';
let passworddb : string = process.env.PASSWORDDB || 'postgres';
let hostdb : string = process.env.HOSTDB || 'localhost';
const portdb : string = process.env.PORTDB  || '5432';

console.log();
console.log('\x1b[32m','╭────────  PostgreSQL  ─────────╮\n');
console.log('\x1b[32m',`    DB: ${database}`);
console.log('\x1b[32m',`    Username: ${usernamedb}`);
console.log('\x1b[32m',`    Password: ${passworddb}`);
console.log('\x1b[32m',`    Host: ${hostdb}`);
console.log('\x1b[32m',`    port: ${portdb}`);
console.log('\x1b[32m','╰───────────────────────────────╯');
console.log('\x1b[0m');

let optionsSequelize : Options = {
    host: hostdb,
    dialect: 'postgres',
    logging: false,
    port: (portdb as unknown as number)   
}

const sequelize = new Sequelize(database, usernamedb, passworddb, optionsSequelize);

export default sequelize;