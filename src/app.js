const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/connection');

const app = express();
app.use(cors());
db.connect();

require('./routes/team')(app);
require('./routes/store')(app);
require('./routes/pet')(app);
require('./routes/user')(app);
require('./routes/auth')(app);
require('./routes/meal')(app);
require('./routes/activity')(app);

module.exports = app;
