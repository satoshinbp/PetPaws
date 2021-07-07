const activityController = require('../controller/activity');

module.exports = (app) => {
  app.get('/api/activity', activityController.findAll);
};
