const petController = require('../controller/pet');

module.exports = (app) => {
  app.get('/api/pet', petController.findAll);
  app.post('/api/pet', petController.create);
  app.put('/api/pet/:id', petController.update);
};
