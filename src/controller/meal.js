const db = require('../config/connection');

exports.findAll = (req, res) => {
  const sqlQuery =
    'SELECT meals.id, uid, date, time, type, calorie FROM meals INNER JOIN mealTest ON meals.user_id = mealTest.id';
  db.query(sqlQuery, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
