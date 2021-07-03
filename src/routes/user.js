const userCreate = require('../controller/user');
const express = require('express');

var jsonParser = express.json();

module.exports = (app) => {
  // post new user
  app.post('/api/user', jsonParser, userCreate.create);
};
