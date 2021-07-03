const db = require('../config/connection');

// constructor
const Team = {};

Team.getAll = (result) => {
  db.query('SELECT * FROM petpaws.team_members', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('customers: ', res);
    result(null, res);
  });
};

module.exports = Team;
