exports.findAll = (req, res) => {
  const sqlQuery = 'SELECT * FROM petpaws.team_members';
  db.query(sqlQuery, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(data);
    }
  });
};
