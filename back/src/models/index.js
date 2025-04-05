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
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    logging: logConsole('Database connection established!', 'info')
});

const sequelize = process.env.BACK_ENV === 'production' ? sequelizeProduction : sequelizeDevelopment;

const models = {
  User: require("./userModel")(sequelize),
  Mood: require("./moodModel")(sequelize),
  Person: require("./personModel")(sequelize),
  Music: require("./musicModel")(sequelize),
  Season: require("./seasonModel")(sequelize),
  Event: require("./eventModel")(sequelize),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
