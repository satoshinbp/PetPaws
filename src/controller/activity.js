const Activity = require('../models/activity');

exports.findAll = (req, res) => {
  Activity.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving customers.',
      });
    else res.send(data);
  });
};
