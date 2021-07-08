const Meal = require('../models/meal');

exports.findAll = (req, res) => {
  Meal.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving customers.',
      });
    else res.send(data);
  });
};
