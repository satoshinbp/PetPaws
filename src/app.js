const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

require('./routes/team')(app);
require('./routes/store')(app);
require('./routes/pet')(app);
require('./routes/user')(app);
require('./routes/auth')(app);
require('./routes/meal')(app);
require('./routes/activity')(app);

module.exports = app;
