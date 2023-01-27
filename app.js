const express = require("express");
const app = express();

// Connect to databases
require("./db/mongo.js");
require("./db/pg.js").checkPGConnection();

// Logging
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

// Connect to mongo
require("./db/mongo.js");

app.use(morgan("tiny"));
app.use(express.static('build'));

// Collect API
const collectRouter = require("./controllers/collect");
app.use("/collect", collectRouter);

// Requests and Bins APIs
const requestController = require("./controllers/requests.js");
app.use("/api/bins/:uuid/requests", requestController);

const binController = require("./controllers/bins.js");
app.use("/api/bins", binController);

// Handles any react paths
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
