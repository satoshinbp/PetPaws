const petController = require('../controller/pet');
const express = require('express');
const jsonParser = express.json();

module.exports = (app) => {
  app.post('/api/pet', jsonParser, petController.petCreate);
  app.get('/api/pet/get', petController.findAll);
};

// const petController = require('../controller/pet');

// module.exports = (app) => {
//   // Retrieve all Stores
//   app.get('/api/pet/get/', petController.findOne);
// };
