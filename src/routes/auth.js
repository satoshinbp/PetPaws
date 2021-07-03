const authController = require('../controller/auth');

module.exports = (app) => {
  app.get('/api/auth', authController.findAll);
};
