const petController = require('../controller/pet');

module.exports = (app) => {
  app.get('/api/pet', petController.findAll);
  app.post('/api/pet', petController.create);
  app.post('/api/pet/:id', petController.update);
};
