const db = require('../config/connection');

// constructor
const Activity = {};

Activity.getAll = (result) => {
  db.query(
    'SELECT activities.id, uid, activities.name, date, minute, distance FROM activities INNER JOIN mealTest ON activities.user_id = mealTest.id',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Activity;
