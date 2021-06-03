const express = require('express');
const app = express();
const mysql = require('mysql')

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'PetPaws'
})

// app.post('')

app.listen(3001, () => {
  console.log("connect")
});