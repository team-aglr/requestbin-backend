const express = require("express");
const app = express();

// Connect to databases
require("./db/mongo.js");
require("./db/pg.js");

// Logging
const morgan = require("morgan");
const cors = require("cors");

// Connect to mongo
require("./db/mongo.js");

app.use(morgan("tiny"));

// Collect API
const collectRouter = require("./controllers/collect");
app.use("/collect", collectRouter);

// Requests and Bins APIs
const requestController = require('./controllers/requests.js');
app.use('/api/bins/:uuid/requests', requestController)

const binController = require('./controllers/bins.js');
app.use('/api/bins', binController)

module.exports = app;
