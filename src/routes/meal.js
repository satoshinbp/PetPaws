const mealController = require('../controller/meal');

module.exports = (app) => {
  app.get('/api/meal', mealController.findAll);
};
