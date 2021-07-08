const db = require('../config/connection');

exports.findAll = (req, res) => {
  const sqlQuery =
    'SELECT activities.id, uid, activities.name, date, minute, distance FROM activities INNER JOIN mealTest ON activities.user_id = mealTest.id';
  db.query(sqlQuery, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
