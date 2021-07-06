const petController = require('../controller/pet');

module.exports = (app) => {
  app.get('/api/pet/get', petController.findAll);
};
