const db = require('../config/connection');

exports.create = (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  const uid = req.body.uid;
  const email = req.body.email;
  const sqlInsert = 'INSERT INTO users (name, uid, email) VALUES (?,?,?)';
  db.query(sqlInsert, [name, uid, email], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(result);
    }
  });
};
