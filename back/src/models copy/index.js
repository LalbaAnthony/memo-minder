const sequelize = require('../database');

// Models
const models = {
  Role: require("./Role.model")(sequelize),
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
