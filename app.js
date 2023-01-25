const express = require("express");
const app = express();

// Connect to databases
require("./db/mongo.js");
require("./db/pg.js").checkPGConnection();

// Logging
const morgan = require("morgan");
app.use(morgan("tiny"));

// Collect API
const collectRouter = require('./controllers/collect');
app.use('/collect', collectRouter)

module.exports = app;
