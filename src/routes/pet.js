const petController = require('../controller/pet');

module.exports = (app) => {
  app.get('/api/pet/get', petController.findAll);
};

// const petController = require('../controller/pet');

// module.exports = (app) => {
//   // Retrieve all Stores
//   app.get('/api/pet/get/', petController.findOne);
// };
