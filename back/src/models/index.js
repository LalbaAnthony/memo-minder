const sequelize = require('../database');

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
