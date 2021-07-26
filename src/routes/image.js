const imageController = require('../controller/image');

module.exports = (app) => {
  app.post('/api/image', imageController.uploader.single('file'), imageController.create);
};
