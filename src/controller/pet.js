const Pet = require('../models/pet');

exports.findOne = (req, res) => {
  Pet.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Customer with id ' + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};
