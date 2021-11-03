import {Sequelize} from 'sequelize';

const database : string = process.env.DATABASE || 'API';
const usernamedb : string = process.env.USERNAMEDB || 'postgres';
const passworddb : string = process.env.PASSWORDDB || 'postgres';
const hostdb : string = process.env.HOSTDB || 'localhost';
const portdb : string = process.env.PORTDB  || '5432';

const sequelize = new Sequelize(database, usernamedb, passworddb, {
    host: hostdb,
    dialect: 'postgres',
    // logging: false
    port: (portdb as unknown as number)
});

export default sequelize;