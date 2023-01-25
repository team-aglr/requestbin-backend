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

module.exports = app;
