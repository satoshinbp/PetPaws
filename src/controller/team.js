const Team = require('../models/team');

exports.findAll = (req, res) => {
  Team.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving customers.',
      });
    else res.send(data);
  });
};
