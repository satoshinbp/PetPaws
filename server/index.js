const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'petpaws-member-test',
  port: 8889,
});

// to connect backend and frontend
app.use(cors());
app.use(express.json()); //middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Display member list
app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM team_members ';
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//Insert new members
app.post('/api/insert', (req, res) => {
  const name = req.body.name;
  const role = req.body.role;
  const image_url = req.body.image_url;
  const linkedin_url = req.body.linkedin_url;
  const github_url = req.body.github_url;
  const behance_url = req.body.behance_url;

  const sqlInsert =
    'INSERT INTO team_members (name, role, image_url, linkedin_url, github_url, behance_url) VALUES (?,?,?,?,?,?)';
  db.query(
    sqlInsert,
    [name, role, image_url, linkedin_url, github_url, behance_url],
    (err, result) => {
      console.log(err);
    }
  );
});

//Delete members
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = 'DELETE FROM team_members WHERE id = ?';

  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

//Update members profile
app.put('/api/update', (req, res) => {
  const id = req.body.id;
  const role = req.body.role;
  const sqlUpdate = 'UPDATE team_members SET role = ? WHERE id = ?';

  db.query(sqlUpdate, [role, id], (err, result) => {
    if (err) console.log(err);
  });
});

//run server on port 3001
app.listen(3001, () => {
  console.log('running on port 3001');
});
