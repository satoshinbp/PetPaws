const db = require('../../config/connection');

// constructor
const Team = function (member) {
  this.id = member.id;
  this.name = member.name;
  this.role = member.role;
  this.image_url = member.image_url;
  this.linkedin_url = member.linkedin_url;
  this.github_url = member.github_url;
  this.behance_url = member.behance_url;
};

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
