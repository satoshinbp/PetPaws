const Member = require('../models/memberModels');

exports.findAll = (req, res) => {
  Member.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving customers.',
      });
    else res.send(data);
  });
};
