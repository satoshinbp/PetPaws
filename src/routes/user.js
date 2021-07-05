const userController = require('../controller/user');
const express = require('express');

const jsonParser = express.json();

// module.exports = (app) => {
//   // post new user
//   app.post('/api/user', jsonParser, userCreate.create);
// };

module.exports = (app) => {
  app.get('/api/user', jsonParser, userController.find);
  app.post('/api/user', jsonParser, userController.create);
};
