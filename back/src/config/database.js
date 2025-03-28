const { Sequelize } = require('sequelize');
const logConsole = require('../helpers/logConsole');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const sequelizeDevelopment = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: logConsole('Database connection established!', 'info')
});

const sequelizeProduction = new Sequelize(process.env.BACK_DATABASE_NAME, process.env.BACK_DATABASE_USERNAME, process.env.BACK_DATABASE_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: logConsole('Database connection established!', 'info')
});

module.exports = process.env.BACK_ENV === 'production' ? sequelizeProduction : sequelizeDevelopment;
