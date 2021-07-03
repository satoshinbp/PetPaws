const petController = require('../controller/pet');

module.exports = (app) => {
  // Retrieve all Stores
  app.get('/api/pet/get/:user_id', petController.findOne);
};
