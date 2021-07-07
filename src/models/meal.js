const db = require('../config/connection');

// constructor
const Meal = {};

Meal.getAll = (result) => {
  db.query(
    'SELECT meals.id, uid, date, time, type, calorie FROM meals INNER JOIN mealTest ON meals.user_id = mealTest.id',
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

module.exports = Meal;
