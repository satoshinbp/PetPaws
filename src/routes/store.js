const storeController = require('../controller/store');

module.exports = (app) => {
  app.get('/api/store', storeController.findAll);
};
