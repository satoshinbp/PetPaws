const userController = require('../controller/user');
const express = require('express');
const jsonParser = express.json();

module.exports = (app) => {
  app.get('/api/user/:uid', jsonParser, userController.find);

  // post new user
  app.post('/api/user', jsonParser, userController.create);
};
