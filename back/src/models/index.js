const sequelize = require('../config/database');

// Models
const models = {
  User: require("./userModel")(sequelize),
  Mood: require("./moodModel")(sequelize),
  Person: require("./personModel")(sequelize),
  Music: require("./musicModel")(sequelize),
  Season: require("./seasonModel")(sequelize),
  Event: require("./eventModel")(sequelize),
};

// Associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
