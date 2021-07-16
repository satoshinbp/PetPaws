const teamController = require('../controller/team');

module.exports = (app) => {
  app.get('/api/team', teamController.findAll);
};
