const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: 3306,
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    name: 'test user',
  };
  jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
    res.json({ token });
  });
});

app.post('/post', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json(authData);
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    // Bearerの後ろのスペース以降がトークンになる為splitして取得
    const bearer = bearerHeader.split(' ');
    // トークンを保持して次の処理に進む
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // トークンが存在しない場合にはエラー
    res.sendStatus(403);
  }
}
app.get('/', (req, res) => {
  res.json({
    message: `test`,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// to connect backend and frontend
app.use(cors());
app.use(express.json()); //middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Display member list
app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM team_members ';
  db.query(sqlSelect, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get('/api/meal', (req, res) => {
  const sqlSelect = 'SELECT meals.id, uid, date, time, type, calorie FROM meals INNER JOIN mealTest ON meals.user_id = mealTest.id' ;
  db.query(sqlSelect, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get('/api/activity', (req, res) => {
  const sqlSelect = 'SELECT activities.id, uid, activities.name, date, minute, distance FROM activities INNER JOIN mealTest ON activities.user_id = mealTest.id' ;
  db.query(sqlSelect, (err, result) => {
    console.log(err);
    console.log(`aa${result}`);
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
  db.query(sqlInsert, [name, role, image_url, linkedin_url, github_url, behance_url], (err, result) => {
    console.log(err);
  });
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
