const petController = require('../controller/pet');
const express = require('express');
const jsonParser = express.json();

module.exports = (app) => {
  app.get('/api/pet', petController.findAll);
  app.post('/api/pet', petController.create);
};
