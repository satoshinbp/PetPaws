const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'PetPaws'
})

app.post('/create', (req, res) => {
  const name = req.body.name;

  db.query('INSERT INTO users (name) VALUES (?)',
    [name], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Success')
      }
    })
})

app.listen(3001, () => {
  console.log("connect")
});