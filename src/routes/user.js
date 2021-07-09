const userController = require('../controller/user');

module.exports = (app) => {
  app.get('/api/user/:uid', userController.find);
  app.post('/api/user', userController.create);
};
