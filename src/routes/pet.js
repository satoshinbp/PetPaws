const petController = require('../controller/pet');
const express = require('express');
const jsonParser = express.json();

module.exports = (app) => {
  // Retrieve all Stores
  app.get('/api/pet/get/:user_id', petController.findOne);

  app.post('/api/pet', jsonParser, petController.petCreate);
};
