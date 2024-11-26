const { Sequelize } = require('sequelize');
const logConsole = require('../helpers/logConsole');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: logConsole('Database connection established!', 'info')
});

module.exports = sequelize;
