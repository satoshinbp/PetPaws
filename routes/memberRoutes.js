const memberController = require('../controller/memberController');

module.exports = (app) => {
  // Retrieve all Customers
  app.get('/api/get', memberController.findAll);
};
