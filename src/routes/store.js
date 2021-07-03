const storeController = require('../controller/store');

module.exports = (app) => {
  // Retrieve all Stores
  app.get('/api/store/get', storeController.findAll);
};
