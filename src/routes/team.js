const teamController = require('../controller/team');

module.exports = (app) => {
  // Retrieve all Customers
  app.get('/api/team/get', teamController.findAll);
};
